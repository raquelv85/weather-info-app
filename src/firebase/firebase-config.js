import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl6_HUJ1NLdTsxRuuWUt8gTRz0Fg3Grlg",
  authDomain: "weather-info-app-6e5f3.firebaseapp.com",
  projectId: "weather-info-app-6e5f3",
  storageBucket: "weather-info-app-6e5f3.appspot.com",
  messagingSenderId: "383172150287",
  appId: "1:383172150287:web:03144eb5e6f15f4eda8f7a"
};

const firebase = initializeApp(firebaseConfig);

export {
  firebase,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}