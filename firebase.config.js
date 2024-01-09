// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIxYEiH2P1uEaV-Y5fPGbt1vyHF46YT6U",
  authDomain: "softyhr-b1de9.firebaseapp.com",
  projectId: "softyhr-b1de9",
  storageBucket: "softyhr-b1de9.appspot.com",
  messagingSenderId: "1014403195883",
  appId: "1:1014403195883:web:d54a77540a5178a41c2fae",
  measurementId: "G-RCG3B0P3K8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
