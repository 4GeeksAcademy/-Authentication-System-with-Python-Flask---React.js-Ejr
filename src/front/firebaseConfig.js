// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqvD7zHqled4-CF2a2YHjwrYTc6jseEPg",
  authDomain: "schedule-shifter-api.firebaseapp.com",
  projectId: "schedule-shifter-api",
  storageBucket: "schedule-shifter-api.appspot.com",
  messagingSenderId: "575695827757",
  appId: "1:575695827757:web:dfbcc1e0b539a1721e19a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
