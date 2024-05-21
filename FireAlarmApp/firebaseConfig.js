// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-RZt8yY3BggFZBRFsIsgYyiF8IWAhESc",
    authDomain: "firealert-notify.firebaseapp.com",
    projectId: "firealert-notify",
    storageBucket: "firealert-notify.appspot.com",
    messagingSenderId: "787645893978",
    appId: "1:787645893978:web:57f65114e00e63d1bdf763",
    measurementId: "G-XW02YSKQX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);