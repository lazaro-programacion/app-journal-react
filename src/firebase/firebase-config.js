import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBTdc6ChFBmiWiVGKz8OtbV84v7-gbOmds",
    authDomain: "react-app-journal-e825e.firebaseapp.com",
    databaseURL: "https://react-app-journal-e825e.firebaseio.com",
    projectId: "react-app-journal-e825e",
    storageBucket: "react-app-journal-e825e.appspot.com",
    messagingSenderId: "142140148857",
    appId: "1:142140148857:web:ad418cb28c422e5f8318a8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Referencia a la base de datos ↓
  const db = firebase.firestore();

  // Referencia a la authentificacion de google
  const googleAuthProvaider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvaider,
      firebase
  }



