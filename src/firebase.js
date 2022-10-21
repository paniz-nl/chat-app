import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyALyvtc3N_KLJNkSPOGVZT9LcHM-d3TT6M",
    authDomain: "panapp-8deb6.firebaseapp.com",
    projectId: "panapp-8deb6",
    storageBucket: "panapp-8deb6.appspot.com",
    messagingSenderId: "709991343972",
    appId: "1:709991343972:web:a69c8341f4e2df93e1bc71"
  }).auth();