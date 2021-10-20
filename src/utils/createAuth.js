import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { appConfig } from '../config/app';

export function createGoogleAuth() {
    const provider = new GoogleAuthProvider();

    provider.addScope('email');

    return provider;
}

export function signWithGoogleRedirect() {
    return signInWithRedirect(createAuth(), createGoogleAuth());
}

export function signBasic(email, password) {
    return signInWithEmailAndPassword(createAuth(), email, password);
}

export default function createAuth() {
    const app = initializeApp(appConfig.firebaseConfig);
    const auth = getAuth(app);

    auth.languageCode = 'bg';

    return auth;
}
