// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl-_cfSgU9wNEfNJekX7BO2KL38Oveuic",
    authDomain: "cpc-judge.firebaseapp.com",
    projectId: "cpc-judge",
    storageBucket: "cpc-judge.appspot.com",
    messagingSenderId: "540044730826",
    appId: "1:540044730826:web:75359a34f8dba9e07b2f33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
