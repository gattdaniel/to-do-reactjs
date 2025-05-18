// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5ICLZklycHaSh4m1NEtVUh8W_eHaYoug",
  authDomain: "todo-list-5e91d.firebaseapp.com",
  projectId: "todo-list-5e91d",
  storageBucket: "todo-list-5e91d.firebasestorage.app",
  messagingSenderId: "955816342248",
  appId: "1:955816342248:web:52a093ff4475852aff4f5d"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter Auth et Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app