(function () {
  const providers = {
    firebase: {
      name: "firebase",
      enabled: true,
      sdkMode: "compat",
      config: {
        apiKey: "AIzaSyCDDjTcTdp0ffdq7vfR4U8I8llGaOIYzQE",
        authDomain: "moneynest-d1027.firebaseapp.com",
        projectId: "moneynest-d1027",
        storageBucket: "moneynest-d1027.firebasestorage.app",
        messagingSenderId: "102636653000",
        appId: "1:102636653000:web:46d595cb10e616b82ad8fd"
      },
      firestore: {
        collection: "moneyNestStates"
      }
    },
    supabase: {
      name: "supabase",
      enabled: false,
      config: {
        url: "",
        anonKey: "",
        schema: "public",
        transactionsTable: "transactions"
      }
    },
    native: {
      name: "native",
      enabled: false,
      config: {
        endpoint: "",
        mode: "offline-first"
      }
    }
  };

  const activeProviderName = "firebase";

  function getProvider(name) {
    return providers[name] || null;
  }

  function getActiveProvider() {
    return getProvider(activeProviderName) || providers.firebase;
  }

  function getFirebaseProvider() {
    return getProvider("firebase");
  }

  function getFirebaseConfig() {
    return getFirebaseProvider()?.config || null;
  }

  function getFirebaseConsoleUrl() {
    const projectId = getFirebaseConfig()?.projectId;
    return projectId
      ? `https://console.firebase.google.com/project/${projectId}/firestore`
      : "";
  }

  window.MoneyNestBackend = {
    activeProviderName,
    providers,
    getProvider,
    getActiveProvider,
    getFirebaseProvider,
    getFirebaseConfig,
    getFirebaseConsoleUrl
  };
})();
