// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  setPersistence, 
  browserSessionPersistence,
  browserLocalPersistence,
  inMemoryPersistence 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3KPNbvBm-mXJwDKL1aPjJUmhSAJ7dCIs",
  authDomain: "compressdocument.firebaseapp.com",
  projectId: "compressdocument",
  storageBucket: "compressdocument.firebasestorage.app",
  messagingSenderId: "928654143586",
  appId: "1:928654143586:web:b7408747e05b6e3ea0e13b",
  measurementId: "G-TRQY0HGSPK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence - यह cookies/session save करने में मदद करेगा
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { app, auth, db };

