function validateBackupShape(data){
  if(!isPlainObject(data)) return {ok:false,message:'Backup file must contain a JSON object.'};
  if(data.app && data.app!=='MoneyNest') return {ok:false,message:'Backup file is not a MoneyNest export.'};
  if(data.exportedAt!==undefined && !isValidDateValue(data.exportedAt)) return {ok:false,message:'Backup export date is invalid.'};
  if(!isValidVersionValue(data.version)) return {ok:false,message:'Backup version is invalid.'};
  if(!validateBackupEntryArray(data.purchases,[item=>isValidDateValue(item.datetime),item=>typeof item.store==='string',item=>validateBackupItems(item.items)])) return {ok:false,message:'Backup purchases data is invalid.'};
  if(!validateBackupEntryArray(data.expenses,[item=>isFiniteNumber(Number(item.amount)),item=>isValidDateValue(item.datetime),item=>typeof item.category==='string'])) return {ok:false,message:'Backup expenses data is invalid.'};
  if(!validateBackupEntryArray(data.incomes,[item=>isFiniteNumber(Number(item.amount)),item=>isValidDateValue(item.datetime),item=>typeof item.category==='string'])) return {ok:false,message:'Backup incomes data is invalid.'};
  if(!validateBackupEntryArray(data.transfers,[item=>isFiniteNumber(Number(item.amount)),item=>isValidDateValue(item.datetime),item=>typeof item.from==='string',item=>typeof item.to==='string'])) return {ok:false,message:'Backup transfers data is invalid.'};
  if(!validateNumericMap(data.monthlyBudgets||{})) return {ok:false,message:'Backup monthly budgets are invalid.'};
  if(!validateNestedNumericMap(data.catBudgetsByMonth||{})) return {ok:false,message:'Backup category budgets are invalid.'};
  if(data.deletedIds!==undefined && (!Array.isArray(data.deletedIds) || !data.deletedIds.every(id=>typeof id==='string'))) return {ok:false,message:'Backup deleted IDs are invalid.'};
  if(data.categoryLabels!==undefined && !validateStringMap(data.categoryLabels)) return {ok:false,message:'Backup category labels are invalid.'};
  return {ok:true};
}
function buildBackupSnapshot(timestamp=new Date()){
  return {
    app:'MoneyNest',
    exportedAt:timestamp.toISOString(),
    version:serverVersion||0,
    purchases,
    expenses,
    incomes,
    transfers,
    monthlyBudgets,
    catBudgetsByMonth,
    deletedIds:uniq(deletedIds),
    categoryLabels
  };
}
function downloadBackupFile({timestamp=new Date(),silent=false,reason='manual'}={}){
  const snapshot=buildBackupSnapshot(timestamp);
  const blob=new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`moneynest-backup-${getBackupStamp(timestamp)}.json`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  setLastBackupAt(timestamp.getTime());
  updateBackupInfo();
  if(!silent){
    toast('Backup completed');
  }
}
function exportBackupJson(){
  downloadBackupFile({timestamp:new Date(),reason:'manual'});
}
function triggerRestoreBackup(){
  document.getElementById('restoreBackupInput')?.click();
}
async function handleRestoreBackup(event){
  const file=event.target.files?.[0];
  if(!file) return;
  try{
    const text=await file.text();
    const parsed=JSON.parse(text);
    const validation=validateBackupShape(parsed);
    if(!validation.ok){
      toast(validation.message || 'Invalid backup file');
      return;
    }
    applyCloudState(parsed);
    saveLocal();
    refreshAllViews();
    updateHdr();
    if(localStorage.getItem(ONBOARDED_KEY)==='pending_restore'){
      localStorage.setItem(ONBOARDED_KEY,'1');
      completeSetup();
    }
    toast('Backup restored locally');
  }catch(err){
    console.warn(err);
    toast('Backup restore failed. Use a valid MoneyNest backup JSON.');
  }finally{
    event.target.value='';
  }
}
