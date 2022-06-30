// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUWvVdJIO81uAdXuU2ed6p1omCYoP0Z90",
  authDomain: "billingsystem-e584a.firebaseapp.com",
  projectId: "billingsystem-e584a",
  storageBucket: "billingsystem-e584a.appspot.com",
  messagingSenderId: "887373903865",
  appId: "1:887373903865:web:f9b596b092ce334e81af28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
