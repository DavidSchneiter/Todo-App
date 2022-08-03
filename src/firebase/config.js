// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1H7fXQmXRVyTRmVo8aZTi8943k43XZhM",
  authDomain: "todo-firebase-9a135.firebaseapp.com",
  projectId: "todo-firebase-9a135",
  storageBucket: "todo-firebase-9a135.appspot.com",
  messagingSenderId: "572612647818",
  appId: "1:572612647818:web:32a9d0166c3d30fec7c673",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
