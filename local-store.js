(function () {
  function defaultCloudState() {
    return {
      purchases: [],
      expenses: [],
      incomes: [],
      transfers: [],
      monthlyBudgets: {},
      catBudgetsByMonth: {},
      deletedIds: [],
      categoryLabels: {},
      version: 0
    };
  }

  function loadLocalState(deps) {
    const state = defaultCloudState();
    const curMonthKey = deps.curM();
    const uniq = deps.uniq;

    try { state.purchases = JSON.parse(localStorage.getItem("gt_p") || "[]"); } catch { state.purchases = []; }
    try { state.expenses = JSON.parse(localStorage.getItem("gt_e") || "[]"); } catch { state.expenses = []; }
    try { state.incomes = JSON.parse(localStorage.getItem("gt_i") || "[]"); } catch { state.incomes = []; }
    try { state.transfers = JSON.parse(localStorage.getItem("gt_t") || "[]"); } catch { state.transfers = []; }
    try { state.monthlyBudgets = JSON.parse(localStorage.getItem("gt_bm") || "{}"); } catch { state.monthlyBudgets = {}; }
    try { state.catBudgetsByMonth = JSON.parse(localStorage.getItem("gt_cbm") || "{}"); } catch { state.catBudgetsByMonth = {}; }

    const legacyBudget = parseFloat(localStorage.getItem("gt_b") || "0");
    if (legacyBudget > 0 && !Object.keys(state.monthlyBudgets).length) {
      state.monthlyBudgets[curMonthKey] = legacyBudget;
    }

    try {
      const legacyCatBudgets = JSON.parse(localStorage.getItem("gt_cb") || "{}");
      if (legacyCatBudgets && typeof legacyCatBudgets === "object" && !Array.isArray(legacyCatBudgets) && !Object.keys(state.catBudgetsByMonth).length) {
        state.catBudgetsByMonth[curMonthKey] = legacyCatBudgets;
      }
    } catch {}

    try { state.deletedIds = uniq(JSON.parse(localStorage.getItem("gt_del") || "[]")); } catch { state.deletedIds = []; }
    try { state.categoryLabels = JSON.parse(localStorage.getItem("gt_cl") || "{}"); } catch { state.categoryLabels = {}; }

    return state;
  }

  function normalizeCloudState(data, deps) {
    const base = defaultCloudState();
    const incoming = data && typeof data === "object" ? data : {};
    const monthly = incoming.monthlyBudgets && typeof incoming.monthlyBudgets === "object" ? incoming.monthlyBudgets : {};
    const catMonthly = incoming.catBudgetsByMonth && typeof incoming.catBudgetsByMonth === "object" ? incoming.catBudgetsByMonth : {};
    const curMonthKey = deps.curM();
    const uniq = deps.uniq;

    if ((parseFloat(incoming.budget) || 0) > 0 && !Object.keys(monthly).length) {
      monthly[curMonthKey] = parseFloat(incoming.budget) || 0;
    }

    if (incoming.catBudgets && typeof incoming.catBudgets === "object" && !Array.isArray(incoming.catBudgets) && !Object.keys(catMonthly).length) {
      catMonthly[curMonthKey] = incoming.catBudgets;
    }

    return {
      purchases: Array.isArray(incoming.purchases) ? incoming.purchases : base.purchases,
      expenses: Array.isArray(incoming.expenses) ? incoming.expenses : base.expenses,
      incomes: Array.isArray(incoming.incomes) ? incoming.incomes : base.incomes,
      transfers: Array.isArray(incoming.transfers) ? incoming.transfers : base.transfers,
      monthlyBudgets: monthly,
      catBudgetsByMonth: catMonthly,
      deletedIds: uniq(Array.isArray(incoming.deletedIds) ? incoming.deletedIds : base.deletedIds),
      categoryLabels: incoming.categoryLabels && typeof incoming.categoryLabels === "object" ? incoming.categoryLabels : base.categoryLabels,
      version: incoming.version !== undefined ? Number(incoming.version) || 0 : base.version
    };
  }

  function saveLocalState(state, deps) {
    const deletedIds = deps.uniq(state.deletedIds);
    localStorage.setItem("gt_p", JSON.stringify(state.purchases));
    localStorage.setItem("gt_e", JSON.stringify(state.expenses));
    localStorage.setItem("gt_i", JSON.stringify(state.incomes));
    localStorage.setItem("gt_t", JSON.stringify(state.transfers));
    localStorage.setItem("gt_bm", JSON.stringify(state.monthlyBudgets));
    localStorage.setItem("gt_cbm", JSON.stringify(state.catBudgetsByMonth));
    localStorage.removeItem("gt_b");
    localStorage.removeItem("gt_cb");
    localStorage.setItem("gt_del", JSON.stringify(deletedIds));
    localStorage.setItem("gt_cl", JSON.stringify(state.categoryLabels));
    return deletedIds;
  }

  window.MoneyNestLocalStore = {
    defaultCloudState,
    loadLocalState,
    normalizeCloudState,
    saveLocalState
  };
})();
