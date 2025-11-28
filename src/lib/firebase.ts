// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1c1Nyl2eWxWR1ji4f8xdDVN8XxaGGego",
  authDomain: "wigwaves-3b7aa.firebaseapp.com",
  databaseURL: "https://wigwaves-3b7aa-default-rtdb.firebaseio.com",
  projectId: "wigwaves-3b7aa",
  storageBucket: "wigwaves-3b7aa.firebasestorage.app",
  messagingSenderId: "752867350514",
  appId: "1:752867350514:web:5be36447c11c141cc8bd6b",
  measurementId: "G-SFY5MFV662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);