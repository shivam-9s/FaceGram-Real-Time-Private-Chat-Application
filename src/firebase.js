import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm1Qi7WaZiKow7P3NEpc5EpcE9eaE-CgQ",
  authDomain: "facegram-956aa.firebaseapp.com",
  projectId: "facegram-956aa",
  storageBucket: "facegram-956aa.firebasestorage.app",
  messagingSenderId: "114091633484",
  appId: "1:114091633484:web:d2a9932c0c1f0765c27de9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
