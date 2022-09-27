import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAgVPRkFqplXhg8IGnYsxQKIbBjdpauLpE",
    authDomain: "chatbox-5e117.firebaseapp.com",
    projectId: "chatbox-5e117",
    storageBucket: "chatbox-5e117.appspot.com",
    messagingSenderId: "197438340505",
    appId: "1:197438340505:web:760818d98cc8a49897e708"
  }).auth();