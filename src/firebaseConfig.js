// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOB_Njd40Dj8g5JvsrBASsfGzrkfC2Ris",
  authDomain: "tdmu-quizchat.firebaseapp.com",
  projectId: "tdmu-quizchat",
  storageBucket: "tdmu-quizchat.appspot.com",
  messagingSenderId: "727064933607",
  appId: "1:727064933607:web:2bbf5f77aca8ffa9fc5e42",
  measurementId: "G-5N3BYTX8LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);