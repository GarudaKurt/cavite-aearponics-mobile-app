import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjhAuT0ozWZRXIEYXg3x97f6vAHJaKU5c",
  authDomain: "ucb-smart-irrigation.firebaseapp.com",
  databaseURL: "https://ucb-smart-irrigation-default-rtdb.firebaseio.com",
  projectId: "ucb-smart-irrigation",
  storageBucket: "ucb-smart-irrigation.appspot.com",
  messagingSenderId: "644840671203",
  appId: "1:644840671203:web:c53dcecef7fa4d9e1682d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth with React Native persistence (only once)
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  // If already initialized (e.g., during hot reload)
  auth = getAuth(app);
}

// Firestore
const db = getFirestore(app);

export { auth, db };

