import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const key = process.env.FB_APIKEY;
const dom = process.env.FB_AUTHDOMAIN;
const project = process.env.FB_PROJECTID;
const storage = process.env.FB_STORAGE;
const msg = process.env.FB_MESSAGING;
const appi = process.env.FB_APPID;
const measure = process.env.FB_MEASURE;

const firebaseApp = firebase.initializeApp({
  apiKey: key,
  authDomain: dom,
  projectId: project,
  storageBucket: storage,
  messagingSenderId: msg,
  appId: appi,
  measurementId: measure,
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
