// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUE9cILmbjdmPogSp3FrrtbeHDfcVWarE',
  authDomain: 'marketplace-e7560.firebaseapp.com',
  projectId: 'marketplace-e7560',
  storageBucket: 'marketplace-e7560.firebasestorage.app',
  messagingSenderId: '370032265858',
  appId: '1:370032265858:web:99c1002dee1c7e8cca029b',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
