// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

//added because of chatgpt

import { getFirestore } from "firebase/firestore";

//

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGtJa6qLyMo5BznH2whv6xrXQrkSpvLq0",
  authDomain: "skillnow-be1c6.firebaseapp.com",
  projectId: "skillnow-be1c6",
  storageBucket: "skillnow-be1c6.firebasestorage.app",
  messagingSenderId: "8444764361",
  appId: "1:8444764361:web:9c78a7a3393096aee22d18",
  measurementId: "G-1Y388DZVPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


//added because of chatgpt

export const db = getFirestore(app);

export default app;

//