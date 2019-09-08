import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyArsIb9LSPFDed1_iMYd-2wVtpZt1xyqQo",
  authDomain: "crud-react-2c68b.firebaseapp.com",
  databaseURL: "https://crud-react-2c68b.firebaseio.com",
  projectId: "crud-react-2c68b",
})

let db = firebase.firestore();

export default db;