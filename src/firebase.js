import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQ4UB4fwEjdcHrvO7EJU1Av9BneOVnyMs",
    authDomain: "week7-shibo.firebaseapp.com",
    projectId: "week7-shibo",
    storageBucket: "week7-shibo.appspot.com",
    messagingSenderId: "910179128319",
    appId: "1:910179128319:web:04bb72577f4ae093f88dca"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);