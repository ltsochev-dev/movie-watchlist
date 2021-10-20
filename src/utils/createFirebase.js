import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { appConfig } from '../config/app';

export function timeNow() {
    return serverTimestamp();
}

export default function createFirebase() {
    const fb = initializeApp(appConfig.firebaseConfig);
    return getFirestore(fb);
}
