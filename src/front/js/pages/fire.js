import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCfCOmyVo1g9pll2w7w3obyKiY6D3punus",
  authDomain: "dogger-chat.firebaseapp.com",
  projectId: "dogger-chat",
  storageBucket: "dogger-chat.appspot.com",
  messagingSenderId: "547875966415",
  appId: "1:547875966415:web:ff84c352a48ac1938016ba",
  measurementId: "G-0V30B7DSY2",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
