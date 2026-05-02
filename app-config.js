(function () {
  const backend = window.MoneyNestBackend || {};
  const FIREBASE_CONFIG = backend.getFirebaseConfig ? backend.getFirebaseConfig() : null;
  const activeProvider = backend.getActiveProvider ? backend.getActiveProvider() : { name: "firebase" };
  const firebaseConsoleUrl = backend.getFirebaseConsoleUrl
    ? backend.getFirebaseConsoleUrl()
    : (FIREBASE_CONFIG?.projectId ? `https://console.firebase.google.com/project/${FIREBASE_CONFIG.projectId}/firestore` : "");

  window.MoneyNestConfig = {
    APP_VERSION: "1.1.0",
    BACKEND_PROVIDER: activeProvider.name,
    BACKEND_SETTINGS: activeProvider,
    FIREBASE_CONFIG,
    FIREBASE_CONSOLE_URL: firebaseConsoleUrl
  };
})();
