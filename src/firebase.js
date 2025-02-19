// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJhrNtFNvR8vzET8gt14utFxTgDxvBVEU",
  authDomain: "taskmanagement-43efd.firebaseapp.com",
  projectId: "taskmanagement-43efd",
  storageBucket: "taskmanagement-43efd.firebasestorage.app",
  messagingSenderId: "1045774584770",
  appId: "1:1045774584770:web:58b04ca3b6e148c1e3645b",
  measurementId: "G-TE2MQ530DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };