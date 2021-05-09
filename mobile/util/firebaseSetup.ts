import firebase from "firebase/app";
import "firebase/auth";

// Code taken from https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a
const firebaseConfig = {
    apiKey: "AIzaSyCqKYgecbzDvWbFueq1QQ6EJseboPRqCHo",
    authDomain: "suggestio-75e77.firebaseapp.com",
    projectId: "suggestio-75e77",
    storageBucket: "suggestio-75e77.appspot.com",
    messagingSenderId: "391038625508",
    appId: "1:391038625508:web:1c4fd7c5edc8ae2b176ef1",
}; //this is where your firebase app values you copied will go

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();