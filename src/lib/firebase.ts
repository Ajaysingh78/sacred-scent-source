// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpXAdO3NAVErMI5dGqzsC28Btnxl8WwXw",
  authDomain: "namamienterprises-d982b.firebaseapp.com",
  projectId: "namamienterprises-d982b",
  storageBucket: "namamienterprises-d982b.firebasestorage.app",
  messagingSenderId: "872505901135",
  appId: "1:872505901135:web:60521d7d1b547cb7a56a3a",
  measurementId: "G-4L29E1FMHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;