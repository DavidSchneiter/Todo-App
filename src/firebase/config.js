// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH8KVkV_OGgz8SNf8L1pRPxSygdPmEHEY",
  authDomain: "react-journal-app-v2.firebaseapp.com",
  projectId: "react-journal-app-v2",
  storageBucket: "react-journal-app-v2.appspot.com",
  messagingSenderId: "605472409687",
  appId: "1:605472409687:web:f1a8ccd3e3e2fbb73a3b12"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );