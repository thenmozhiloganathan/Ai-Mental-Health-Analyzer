import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHQXaSS_lLixTQ7-OtWdMg7821iQJuY3w",
  authDomain: "ai-mental-health-463cc.firebaseapp.com",
  projectId: "ai-mental-health-463cc",
  storageBucket: "ai-mental-health-463cc.firebasestorage.app",
  messagingSenderId: "121964908985",
  appId: "1:121964908985:web:1547792b9f335053a92668",
  measurementId: "G-MPB6CXM46T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
