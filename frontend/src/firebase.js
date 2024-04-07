// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tracify-e7aca.firebaseapp.com",
  projectId: "tracify-e7aca",
  storageBucket: "tracify-e7aca.appspot.com",
  messagingSenderId: "751307442831",
  appId: "1:751307442831:web:9450ac1c908878ef52fefa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
