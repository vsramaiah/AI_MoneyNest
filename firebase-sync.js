(function () {
  let firestoreDb = null;
  let firebaseReady = false;
  let persistenceTried = false;

  function getActiveProvider() {
    return window.MoneyNestBackend?.getActiveProvider?.() || { name: "firebase" };
  }

  function getFirebaseProvider() {
    return window.MoneyNestBackend?.getFirebaseProvider?.() || null;
  }

  function applyOfflineState(hooks) {
    if (hooks && hooks.setDot) hooks.setDot("off");
  }

  function applySyncingState(hooks) {
    if (hooks && hooks.setDot) hooks.setDot("syncing");
  }

  function applyOnlineState(hooks) {
    if (hooks && hooks.setDot) hooks.setDot("on");
  }

  async function ensureFirebase(hooks) {
    if (firebaseReady && firestoreDb) return true;
    if (getActiveProvider().name !== "firebase") {
      applyOfflineState(hooks);
      if (hooks && hooks.toast) hooks.toast("Active sync provider is not Firebase");
      return false;
    }
    if (typeof window.firebase === "undefined") {
      applyOfflineState(hooks);
      if (hooks && hooks.toast) hooks.toast("Firebase library did not load");
      return false;
    }

    try {
      const firebaseConfig = window.MoneyNestConfig?.FIREBASE_CONFIG || getFirebaseProvider()?.config;
      if (!firebaseConfig) {
        throw new Error("Firebase config missing");
      }

      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }

      firestoreDb = window.firebase.firestore();
      if (!persistenceTried) {
        persistenceTried = true;
        try {
          await firestoreDb.enablePersistence({ synchronizeTabs: true });
        } catch (err) {
          console.warn("Firestore persistence unavailable", err);
        }
      }

      firebaseReady = true;
      return true;
    } catch (err) {
      console.error("Firebase init failed", err);
      applyOfflineState(hooks);
      if (hooks && hooks.toast) hooks.toast("Could not connect to Firebase");
      return false;
    }
  }

  function cleanSyncCode(syncCode) {
    return String(syncCode || "default").trim().toLowerCase().replace(/\s+/g, "_") || "default";
  }

  function userDoc(syncCode) {
    return firestoreDb.collection("users").doc(cleanSyncCode(syncCode));
  }

  function transactionsCollection(syncCode) {
    return userDoc(syncCode).collection("transactions");
  }

  function stateDoc(syncCode) {
    return userDoc(syncCode).collection("meta").doc("state");
  }

  function stateToTransactions(state) {
    const typed = [];
    (state.purchases || []).forEach((item) => typed.push({ ...item, type: "purchase" }));
    (state.expenses || []).forEach((item) => typed.push({ ...item, type: "expense" }));
    (state.incomes || []).forEach((item) => typed.push({ ...item, type: "income" }));
    (state.transfers || []).forEach((item) => typed.push({ ...item, type: "transfer" }));
    return typed;
  }

  function transactionsToState(baseState, docs) {
    const next = {
      ...baseState,
      purchases: [],
      expenses: [],
      incomes: [],
      transfers: []
    };

    docs.forEach((doc) => {
      const row = { ...doc };
      const type = row.type;
      delete row.type;
      if (type === "purchase") next.purchases.push(row);
      else if (type === "expense") next.expenses.push(row);
      else if (type === "income") next.incomes.push(row);
      else if (type === "transfer") next.transfers.push(row);
    });

    return next;
  }

  async function readState(syncCode, hooks, normalizeCloudState, defaultCloudState) {
    if (!(await ensureFirebase(hooks))) return null;
    try {
      applySyncingState(hooks);
      const code = cleanSyncCode(syncCode);
      const [metaSnap, txSnap] = await Promise.all([
        stateDoc(code).get(),
        transactionsCollection(code).get()
      ]);

      const base = metaSnap.exists ? normalizeCloudState(metaSnap.data()) : defaultCloudState();
      const transactions = txSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const state = transactionsToState(base, transactions);
      applyOnlineState(hooks);
      return normalizeCloudState(state);
    } catch (err) {
      console.error("Firebase read failed", err);
      applyOfflineState(hooks);
      return null;
    }
  }

  async function writeState(syncCode, data, hooks, normalizeCloudState) {
    if (!(await ensureFirebase(hooks))) return null;
    try {
      applySyncingState(hooks);
      const code = cleanSyncCode(syncCode);
      const payload = normalizeCloudState({ ...data, version: Date.now() });
      const txDocs = stateToTransactions(payload);
      const batch = firestoreDb.batch();
      const txRef = transactionsCollection(code);
      const existing = await txRef.get();

      existing.forEach((doc) => batch.delete(doc.ref));
      txDocs.forEach((item) => {
        batch.set(txRef.doc(item.id), item);
      });

      batch.set(stateDoc(code), {
        monthlyBudgets: payload.monthlyBudgets,
        catBudgetsByMonth: payload.catBudgetsByMonth,
        deletedIds: payload.deletedIds,
        categoryLabels: payload.categoryLabels,
        version: payload.version,
        lastSyncedAt: Date.now()
      }, { merge: true });

      await batch.commit();
      applyOnlineState(hooks);
      return { ok: true, version: payload.version };
    } catch (err) {
      console.error("Firebase write failed", err);
      applyOfflineState(hooks);
      return null;
    }
  }

  async function syncPending(syncCode, pendingState, fullState, hooks, normalizeCloudState) {
    if (!(await ensureFirebase(hooks))) return null;
    try {
      applySyncingState(hooks);
      const code = cleanSyncCode(syncCode);
      const batch = firestoreDb.batch();
      const txRef = transactionsCollection(code);
      const pending = pendingState && typeof pendingState === "object"
        ? pendingState
        : { upserts: {}, deletes: [] };

      Object.values(pending.upserts || {}).forEach((entry) => {
        if (!entry?.record?.id || !entry?.type) return;
        batch.set(txRef.doc(entry.record.id), {
          ...entry.record,
          type: entry.type,
          syncStatus: "synced"
        }, { merge: true });
      });

      (pending.deletes || []).forEach((id) => {
        if (!id) return;
        batch.delete(txRef.doc(id));
      });

      const payload = normalizeCloudState({ ...fullState, version: Date.now() });
      batch.set(stateDoc(code), {
        monthlyBudgets: payload.monthlyBudgets,
        catBudgetsByMonth: payload.catBudgetsByMonth,
        deletedIds: payload.deletedIds,
        categoryLabels: payload.categoryLabels,
        version: payload.version,
        lastSyncedAt: Date.now()
      }, { merge: true });

      await batch.commit();
      applyOnlineState(hooks);
      return { ok: true, version: payload.version };
    } catch (err) {
      console.error("Firebase pending sync failed", err);
      applyOfflineState(hooks);
      return null;
    }
  }

  window.MoneyNestFirebase = {
    ensureFirebase,
    readState,
    writeState,
    syncPending,
    cleanSyncCode,
    getProjectId() {
      return window.MoneyNestConfig?.FIREBASE_CONFIG?.projectId || "";
    },
    getConsoleUrl() {
      return window.MoneyNestConfig?.FIREBASE_CONSOLE_URL || "";
    }
  };
})();
