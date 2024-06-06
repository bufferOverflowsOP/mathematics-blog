import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBDAlJ62ypuPpAKnWh7Cq_2-SzoGE4Td4w",
  authDomain: "mathematics-forum-62862.firebaseapp.com",
  projectId: "mathematics-forum-62862",
  storageBucket: "mathematics-forum-62862.appspot.com",
  messagingSenderId: "262622979097",
  appId: "1:262622979097:web:a2a26fee8bdffa8400f688",
  measurementId: "G-27R5BW4WXP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;