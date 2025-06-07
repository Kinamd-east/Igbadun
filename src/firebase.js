// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAJ_AV3bA_8gryy1wFUXksWHSYUVHKC6wI",
  authDomain: "landoftheforgotten-1651c.firebaseapp.com",
  projectId: "landoftheforgotten-1651c",
  storageBucket: "landoftheforgotten-1651c.firebasestorage.app",
  messagingSenderId: "332030343716",
  appId: "1:332030343716:web:b015de597836ba441f36b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;