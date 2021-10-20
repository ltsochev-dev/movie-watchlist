export const appConfig = {
    APP_NAME: import.meta.env.VITE_APP_NAME,
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    BACKEND_URL: import.meta.env.VITE_APP_BACKEND_URL,
    MOVIEDB_KEY: import.meta.env.VITE_MOVIEDB_KEY,
    HISTORY_URL: import.meta.env.VITE_HISTORY_URL || '/',
    firebaseConfig: {
        apiKey: import.meta.env.VITE_FIREBASE_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID,
    },
};
