import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

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

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage directly
});

// Initialize Firestore
const db = getFirestore(app);

// Export Firebase services
export { auth, db };