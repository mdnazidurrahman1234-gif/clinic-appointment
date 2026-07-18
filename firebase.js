import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6wKkpZ9KmRi1_nPmBrvmAk-v5YSLRczo",
  authDomain: "clinic-appointment-72505.firebaseapp.com",
  databaseURL: "https://clinic-appointment-72505-default-rtdb.firebaseio.com",
  projectId: "clinic-appointment-72505",
  storageBucket: "clinic-appointment-72505.firebasestorage.app",
  messagingSenderId: "969154219142",
  appId: "1:969154219142:web:5f40ff23ae2d7cafb95507"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

export {
  db,
  auth,
  ref,
  push,
  onValue,
  remove,
  update,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};