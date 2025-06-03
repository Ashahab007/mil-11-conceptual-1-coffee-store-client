// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwUfz6qRnNikc2n3Sjs2lvAh9oCkH-C8o",
  authDomain: "mil-10-m-56-crud-expresso-auth.firebaseapp.com",
  projectId: "mil-10-m-56-crud-expresso-auth",
  storageBucket: "mil-10-m-56-crud-expresso-auth.firebasestorage.app",
  messagingSenderId: "1012449451663",
  appId: "1:1012449451663:web:0001ce4357dc2ed2975afa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
