import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyA4l9Lf8s2gr29XG7x2grc6_4xp5gq66qo",
    authDomain: "nurs-chat.firebaseapp.com",
    projectId: "nurs-chat",
    storageBucket: "nurs-chat.appspot.com",
    messagingSenderId: "826947870659",
    appId: "1:826947870659:web:88427ac91d63b85127e776",
    measurementId: "G-7YJ7YBZ4R0"
  }).auth();