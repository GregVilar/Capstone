// firebaseConfig.js
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxaSaV_lDcDB7HXOLCgClYl_wkNr2tFZY",
  authDomain: "capstone-aeb76.firebaseapp.com",
  projectId: "capstone-aeb76",
  storageBucket: "capstone-aeb76.appspot.com",
  messagingSenderId: "312098154025",
  appId: "1:312098154025:web:2ebcbac217d4c5af015e38",
  measurementId: "G-WYQB0SWEPF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
export const firestore = getFirestore(app);