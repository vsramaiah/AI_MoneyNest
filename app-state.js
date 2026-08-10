function loadLocalState(){
  const state=window.MoneyNestLocalStore.loadLocalState({curM,uniq});
  purchases=state.purchases;
  expenses=state.expenses;
  incomes=state.incomes;
  transfers=state.transfers;
  monthlyBudgets=state.monthlyBudgets;
  catBudgetsByMonth=state.catBudgetsByMonth;
  deletedIds=state.deletedIds;
  categoryLabels=state.categoryLabels;
}
function normalizeCloudState(data){
  return window.MoneyNestLocalStore.normalizeCloudState(data,{curM,uniq});
}
function applyCloudState(data){
  const state=normalizeCloudState(data);
  purchases=state.purchases;
  expenses=state.expenses;
  incomes=state.incomes;
  transfers=state.transfers;
  monthlyBudgets=state.monthlyBudgets;
  catBudgetsByMonth=state.catBudgetsByMonth;
  deletedIds=state.deletedIds;
  categoryLabels=state.categoryLabels;
  normalizePurchaseStores();
  serverVersion=state.version;
  saveLocal();
  _buildPriceCache();
  renderDash();
  renderHist();
}
function saveLocal(){
  try{
    deletedIds=window.MoneyNestLocalStore.saveLocalState({
      purchases,
      expenses,
      incomes,
      transfers,
      monthlyBudgets,
      catBudgetsByMonth,
      deletedIds,
      categoryLabels
    },{uniq});
    serverVersion=Math.max(0,Number(serverVersion)||0);
    return true;
  }catch(err){
    console.warn(err);
    toast(err.message||'Local save failed. Export a backup and free browser storage.',4500);
    return false;
  }
}
function getProfileName(){
  return (localStorage.getItem(PROFILE_NAME_KEY) || 'Varun').trim() || 'Varun';
}
function setProfileName(name){
  localStorage.setItem(PROFILE_NAME_KEY, (name || 'Varun').trim() || 'Varun');
}
function renderProfileName(){
  const greetingNameEl=document.getElementById('homeGreetingName');
  const greetingInputEl=document.getElementById('homeGreetingInput');
  const profileName=getProfileName();
  if(greetingNameEl) greetingNameEl.textContent=profileName;
  if(greetingInputEl) greetingInputEl.value=profileName;
}
function editProfileName(){
  const titleRow=document.getElementById('helloTitleRow');
  const editRow=document.getElementById('helloNameEdit');
  const input=document.getElementById('homeGreetingInput');
  if(!titleRow||!editRow||!input) return;
  input.value=getProfileName();
  titleRow.classList.add('editing');
  editRow.classList.add('on');
  setTimeout(()=>{
    input.focus();
    input.select();
  },0);
}
function closeProfileNameInline(){
  document.getElementById('helloTitleRow')?.classList.remove('editing');
  document.getElementById('helloNameEdit')?.classList.remove('on');
}
function saveProfileNameInline(){
  const input=document.getElementById('homeGreetingInput');
  const cleaned=(input?.value||'').trim();
  if(!cleaned){
    toast('Name cannot be empty');
    input?.focus();
    return;
  }
  setProfileName(cleaned);
  renderProfileName();
  closeProfileNameInline();
  toast('Name updated');
}
function getLastBackupAt(){
  return Number(localStorage.getItem(LAST_BACKUP_AT_KEY) || '0') || 0;
}
function setLastBackupAt(timestamp){
  localStorage.setItem(LAST_BACKUP_AT_KEY, String(Number(timestamp) || Date.now()));
}
function formatBackupTime(timestamp){
  if(!timestamp) return 'Never';
  const date=new Date(timestamp);
  return `${date.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})} at ${date.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})}`;
}
function getBackupStamp(date=new Date()){
  return `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}T${String(date.getHours()).padStart(2,'0')}${String(date.getMinutes()).padStart(2,'0')}${String(date.getSeconds()).padStart(2,'0')}`;
}
function updateBackupInfo(){
  const backupInfoEl=document.getElementById('backupInfo');
  if(!backupInfoEl) return;
  const lastBackupAt=getLastBackupAt();
  backupInfoEl.classList.remove('warn');
  if(!lastBackupAt){
    backupInfoEl.classList.add('warn');
    backupInfoEl.textContent=hasAnyLocalData()
      ?'Backup reminder: No backup exported yet. Download one now to protect your data.'
      :'Last backup: Never';
    return;
  }
  const ageDays=Math.floor((Date.now()-lastBackupAt)/(24*60*60*1000));
  if(ageDays>=7){
    backupInfoEl.classList.add('warn');
    backupInfoEl.textContent=`Backup reminder: Last backup was ${ageDays} days ago. Export a fresh backup.`;
    return;
  }
  backupInfoEl.textContent=`Last backup: ${formatBackupTime(lastBackupAt)}`;
}
function hasAnyLocalData(){
  return !!(
    purchases.length||
    expenses.length||
    incomes.length||
    transfers.length||
    Object.keys(monthlyBudgets||{}).length||
    Object.keys(catBudgetsByMonth||{}).length||
    deletedIds.length
  );
}
