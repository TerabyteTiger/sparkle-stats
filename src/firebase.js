import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// 👆 This example is using Auth + Firestore

var firebaseConfig = {
  // This comes from Google - add your config here
  apiKey: "AIzaSyDoafYdGgG7oRrvftsVPLgKKWiLWiqhJdM",
  authDomain: "sparkle-stats.firebaseapp.com",
  databaseURL: "https://sparkle-stats.firebaseio.com",
  projectId: "sparkle-stats",
  storageBucket: "sparkle-stats.appspot.com",
  messagingSenderId: "632595938780",
  appId: "1:632595938780:web:77d016f7fab377a985a319"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collections
const usersCollection = db.collection("users");
// 👆 Here you create your Collections you want to use later

// 👇 You export things here | update the variable names
export { db, auth, usersCollection };
