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
}
function getProfileName(){
  return (localStorage.getItem(PROFILE_NAME_KEY) || 'Varun').trim() || 'Varun';
}
function setProfileName(name){
  localStorage.setItem(PROFILE_NAME_KEY, (name || 'Varun').trim() || 'Varun');
}
function renderProfileName(){
  const greetingNameEl=document.getElementById('homeGreetingName');
  if(greetingNameEl) greetingNameEl.textContent=getProfileName();
}
function editProfileName(){
  const nextName=window.prompt('Enter your name', getProfileName());
  if(nextName===null) return;
  const cleaned=nextName.trim();
  if(!cleaned){
    toast('Name cannot be empty');
    return;
  }
  setProfileName(cleaned);
  renderProfileName();
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
