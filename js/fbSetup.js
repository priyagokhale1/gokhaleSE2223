// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

  import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtT4cj3cPUyVEldUQ7zhnOzjavOapWV4I",
    authDomain: "researchproj-59c78.firebaseapp.com",
    projectId: "researchproj-59c78",
    storageBucket: "researchproj-59c78.appspot.com",
    messagingSenderId: "728230395463",
    appId: "1:728230395463:web:bf20e54a1d1a0653357b62"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth();

// Return an instance of your app's FRD (firebase realtime database)
const db = getDatabase(app);
// Import the functions you need from the SDKs you need



// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink');  // user name for navbar
let signOutLink = document.getElementById('signOut'); // signout link
let welcome = document.getElementById('welcome'); // welcome header
let currentUser = null;   // Initiliazes curentUser to null
