// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxovDYhuOqAUJFwGDE0xzaXigkM7-byLc",
  authDomain: "expense-b54b4.firebaseapp.com",
  projectId: "expense-b54b4",
  storageBucket: "expense-b54b4.appspot.com",
  messagingSenderId: "534241287468",
  appId: "1:534241287468:web:2a51a599a60fc0468f2089",
  measurementId: "G-4SNYHBX3QB",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(app);
