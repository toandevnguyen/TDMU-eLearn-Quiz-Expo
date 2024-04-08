import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tdmu-quizchat.firebaseapp.com",
  projectId: "tdmu-quizchat",
  storageBucket: "tdmu-quizchat.appspot.com",
  messagingSenderId: "727064933607",
  appId: "1:727064933607:web:2bbf5f77aca8ffa9fc5e42",
  measurementId: "G-5N3BYTX8LH",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
