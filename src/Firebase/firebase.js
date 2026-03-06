
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyDfVMoL0rstzz4WePHsZdMmFz0vpyVYDlI",
  authDomain: "educase-assesment.firebaseapp.com",
  projectId: "educase-assesment",
  storageBucket: "educase-assesment.firebasestorage.app",
  messagingSenderId: "773906691377",
  appId: "1:773906691377:web:fff65c5828c2d68be62c10",
  measurementId: "G-MC3JKB506G"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);