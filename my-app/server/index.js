import './index.css';


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv1D7LixTCVGpOjHX_nnDMh_El-uNp1P8",
  authDomain: "soen-341-59faa.firebaseapp.com",
  projectId: "soen-341-59faa",
  storageBucket: "soen-341-59faa.appspot.com",
  messagingSenderId: "854348376934",
  appId: "1:854348376934:web:879f586c5da73ffba7f6a7",
  measurementId: "G-G8EDX1S28J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
