import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLQavjboucO-pbG0K9FOXhNeDh6P604sY",
  authDomain: "whatsapp-clone-91f87.firebaseapp.com",
  projectId: "whatsapp-clone-91f87",
  storageBucket: "whatsapp-clone-91f87.appspot.com",
  messagingSenderId: "795862928736",
  appId: "1:795862928736:web:4be085dd984f62a1cbe205",
  measurementId: "G-TQGD0PX49P",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const database = getDatabase();
