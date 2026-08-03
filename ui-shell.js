(function () {
  function goTab(id, btn, deps) {
    const nav = document.querySelector(".nav");
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("on"));
    document.querySelectorAll(".nav button").forEach((button) => button.classList.remove("on"));
    document.getElementById(`v-${id}`).classList.add("on");
    if (btn && btn.id) btn.classList.add("on");
    if (nav) nav.style.display = "flex";
    if (id === "dash") deps.renderDash();
    if (id === "hist") {
      deps.renderHSF();
      deps.renderHist();
    }
    if (id === "ins") deps.renderIns();
    if (id === "list") {
      const sess = document.getElementById("sub-sess");
      const cal = document.getElementById("sub-cal");
      const sessTab = document.getElementById("st-sess");
      const calTab = document.getElementById("st-cal");
      if (sess) sess.style.display = "block";
      if (cal) cal.style.display = "none";
      if (sessTab) sessTab.classList.add("on");
      if (calTab) calTab.classList.remove("on");
      deps.renderSessions();
    }
    if (id === "add") deps.setAddMode(deps.getAddMode());
  }

  function setAddMode(mode, deps) {
    deps.setAddModeState(mode);
    document.querySelectorAll('[id^="addTab-"]').forEach((element) => element.classList.remove("on"));
    document.getElementById(`addTab-${mode}`)?.classList.add("on");
    const hint = document.getElementById("addModeHint");
    if (hint) {
      hint.textContent = mode === "expense"
        ? "Select a category first, then a sub-category, and log the amount in one simple flow."
        : mode === "income"
          ? "Choose the income category and record the incoming amount."
          : "Record money sent or received between people or channels. Transfers do not affect balance.";
    }
    deps.resetExpPath();
  }

  function showSubTab(id, deps) {
    document.querySelectorAll(".stab").forEach((tab) => tab.classList.remove("on"));
    document.getElementById(`st-${id}`).classList.add("on");
    document.getElementById("sub-sess").style.display = id === "sess" ? "block" : "none";
    document.getElementById("sub-cal").style.display = id === "cal" ? "block" : "none";
    if (id === "sess") deps.renderSessions();
    if (id === "cal") deps.renderCalendarView();
  }

  function openListSessions(deps) {
    goTab("list", document.getElementById("navList"), deps);
    showSubTab("sess", deps);
  }

  function openCalendarView(deps) {
    goTab("list", document.getElementById("navList"), deps);
    showSubTab("cal", deps);
    document.getElementById("sub-cal")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeCalendarView(deps) {
    showSubTab("sess", deps);
  }

  function setDashRangeFromMore(value, deps) {
    deps.setDashRange(value);
    goTab("dash", document.getElementById("navDash"), deps);
  }

  function openCatBudget(deps) {
    const monthCatBudgets = deps.getCategoryBudgetsForMonth(deps.getBudgetCursor());
    document.getElementById("catBudFields").innerHTML = deps.CATS.map((cat) => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="flex:1;font-size:13px;display:flex;align-items:center;gap:8px">${deps.tag(cat,cat.slice(0,3))} ${cat}</div>
        <input type="number" min="0" id="cb_${cat.replace(/[^a-z]/gi,'_')}" value="${monthCatBudgets[cat]||''}" placeholder="₹ limit"
          oninput="updateCatBudgetTotal()"
          style="width:110px;border:1px solid #dfe6df;border-radius:12px;padding:8px 9px;font-size:13px;font-family:inherit;outline:none;text-align:right"/>
      </div>`).join("");
    document.getElementById("catBudAll").value = "";
    deps.updateCatBudgetTotal();
    document.getElementById("catBudMod").classList.add("on");
  }

  function closeCatBudget() {
    document.getElementById("catBudMod").classList.remove("on");
  }

  function openCategoriesManager(deps) {
    deps.renderCategoryManager();
    document.getElementById("catMgrMod").classList.add("on");
  }

  function closeCategoriesManager() {
    document.getElementById("catMgrMod").classList.remove("on");
  }

  function openSett() {
    document.getElementById("settMod").classList.add("on");
  }

  function closeSett() {
    document.getElementById("settMod").classList.remove("on");
  }

  window.MoneyNestUI = {
    goTab,
    setAddMode,
    showSubTab,
    openListSessions,
    openCalendarView,
    closeCalendarView,
    setDashRangeFromMore,
    openCatBudget,
    closeCatBudget,
    openCategoriesManager,
    closeCategoriesManager,
    openSett,
    closeSett
  };
})();
