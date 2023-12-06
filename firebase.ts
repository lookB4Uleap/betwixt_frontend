// Import the functions you need from the SDKs you need
import  firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { firebaseConfig } from './firebase.config.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
export const auth = firebase.auth();
export {app, firebase};