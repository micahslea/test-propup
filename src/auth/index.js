// import * as firebase from 'firebase'
import * as firebase from "firebase";
// import "firebase/firestore";
const config = {
  apiKey: "AIzaSyBnLQEvOtyIbQBMv2O-UooBpasIjZB-820",
  authDomain: "prop-up.firebaseapp.com",
  databaseURL: "https://prop-up.firebaseio.com",
  projectId: "prop-up",
  storageBucket: "prop-up.appspot.com",
  messagingSenderId: "573501019403",
  appId: "1:573501019403:web:42fd782d3edbcf2614be0e",
  measurementId: "G-63BPLCL3WC",
};
firebase.initializeApp(config);
export default firebase;
