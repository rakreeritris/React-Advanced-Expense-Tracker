import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDmVaUKDOKUUZx8xr3JDtrkay1_0fwXYr0",
  authDomain: "expensetracker-8cda6.firebaseapp.com",
  projectId: "expensetracker-8cda6",
  storageBucket: "expensetracker-8cda6.appspot.com",
  messagingSenderId: "426121637887",
  appId: "1:426121637887:web:8782748c0c87954377c1ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
