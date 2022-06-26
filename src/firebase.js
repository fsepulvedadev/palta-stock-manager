// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBehCjkRmePqVnqXnYhZXct70apNWf0b34",
  authDomain: "palta-store.firebaseapp.com",
  projectId: "palta-store",
  storageBucket: "palta-store.appspot.com",
  messagingSenderId: "1040224194570",
  appId: "1:1040224194570:web:b5325b0d6cac9dac6c0ff3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
