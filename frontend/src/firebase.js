// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-f2dee.firebaseapp.com",
    projectId: "mern-auth-f2dee",
    storageBucket: "mern-auth-f2dee.appspot.com",
    messagingSenderId: "736548817546",
    appId: "1:736548817546:web:c4a1554aa67763ea557b73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);