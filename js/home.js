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


// ----------------------- Get User's Name'Name ------------------------------
function getUsername() {
  // Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  // grab user information passed from signIn.js
  if(keepLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem('user'));
  }
  else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));

  }
}

function signOutUser() {
  sessionStorage.removeItem('user');    // Clear session storage
  localStorage.removeItem('user');      // Clear local storage
  localStorage.removeItem('keepLoggedIn');

  signOut(auth).then(() => {
    // Sign-out successful
  }).catch((error) => {
    // Error occurred 
  });

  window.location = "home.html"
}


// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------
function setData(userID, trial, concentration, absorption) {
  // Must use brackets around variable name to use it as a key
  set(ref(db, 'users/' + userID + '/data/' + trial), {
    [concentration]: absorption
  })
  .then(() => {
    alert("Data stored successfully.");
  })
  .catch((error) => {
    alert("There was an error. Error : " + error);
  });

  // Set, update, get, remove temperature data
  
  // set data
  
 
}


// -------------------------Update data in database --------------------------
function updateData(userID, trial, concentration, absorption) {
  // Must use brackets around variable name to use it as a key
  update(ref(db, 'users/' + userID + '/data/' + trial), {
    [concentration]: absorption
  })
  .then(() => {
    alert("Data stored successfully.");
  })
  .catch((error) => {
    alert("There was an error. Error : " + error);
  });
}

// ----------------------Get a datum from FRD (single data point)---------------
function getData(userID, trial, concentration){
  let trialVal = document.getElementById('trialVal');
  let concentrationVal = document.getElementById('concentrationVal');
  let absorptionVal = document.getElementById('absorptionVal');

  const dbref = ref(db); // Firebase parameter required for the 'get' function
  
  // provide the path through the nodes to the data
  get(child(dbref, 'users/' + userID + '/data/' + trial)).then((snapshot)=> {
    if(snapshot.exists()) {
      trialVal.textContent = trial;
      concentrationVal.textContent = concentration;

      // To get a specific value from a key: snapshot.value()[key]
      absorptionVal.textContent = snapshot.val()[concentration];
    }
    else {
      alert('No data found.')
    }
  })
  .catch((error) => {
    alert('unsuccessful, error ' + error)
  });
}

// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph


// Add a item to the table of data



// -------------------------Delete a day's data from FRD ---------------------



// --------------------------- Home Page Loading -----------------------------
window.onload = function() {
  // ------------------------- Set Welcome Message -------------------------
  getUsername();
  if(currentUser == null) {
    userLink.innerText = "Create New Account";
    userLink.classList.replace("nav-link", "btn");
    userLink.classList.add("btn-primary")
    userLink.href = "register.html";

    signOutLink.innerText="Sign In";
    signOutLink.classList.replace("nav-link", "btn");
    signOutLink.classList.add("btn-success");
    signOutLink.href = "signIn.html";
  } 
  else {
    userLink.innerText = currentUser.firstname;
    welcome.innerText = "Welcome " + currentUser.firstname;
    userLink.classList.replace("btn", "nav-link");
    userLink.classList.add("btn-primary")
    userLink.href = "#";

    signOutLink.innerText="Sign Out";
    signOutLink.classList.replace("btn", "nav-link");
    signOutLink.classList.add("btn-success");
    document.getElementById('signOut').onclick = function() {
      signOutUser();
    }
  }


  // Set, update, get, remove temperature data
  
  // set data
  document.getElementById('set').onclick = function() {
    const trial = document.getElementById('trial').value;
    const concentration = document.getElementById('concentration').value;
    const absorption = document.getElementById('absorption').value;
    const userID = currentUser.uid;

    setData(userID, trial, concentration, absorption);

  };
  //update data
  document.getElementById('update').onclick = function() {
    const trial = document.getElementById('trial').value;
    const concentration = document.getElementById('concentration').value;
    const absorption = document.getElementById('absorption').value;
    const userID = currentUser.uid;

    updateData(userID, trial, concentration, absorption);

  };

  //get a datum
  document.getElementById('get').onclick = function() {
    const trial = document.getElementById('getTrial').value;
    const concentration = document.getElementById('getConcentration').value;
    const userID = currentUser.uid;

    getData(userID, trial, concentration, absorption);

  };

  // get a dataset
  document.getElementById('getDataSet').onclick = function() {
    const trial = document.getElementById('getSetTrial').value;
    const userID = currentUser.uid;

    getDataSet(userID, trial);

  };

  // delete a day's data
  document.getElementById('delete').onclick = function() {
    const trial = document.getElementById('delTrial').value;
    const concentration = document.getElementById('delConcentration').value;
    const userID = currentUser.uid;

    deleteData(userID, trial, concentration);

  };
 
}

// Get a data set 
// Must be an async function because you need to get al of the data before you can process it for a table or graph 
async function getDataSet(userID, trial) {
  let trialVal = document.getElementById('setTrialVal');

  trialVal.textContent = `Trial: ${trial}`;

  const concentration = [];
  const absorption = [];
  const tbodyEl = document.getElementById('tbody-2');     // Select <tbody> from table

  const dbref = ref(db); // Firebase parameter required for 'get'

  // wait for all data to be pulled from the FRD
  // provide path through the nodes to the data
  await get(child(dbref, 'users/' + userID + '/data/' + trial)).then((snapshot) => {
    if(snapshot.exists()) {
      console.log(snapshot.val());

      snapshot.forEach(child => {
        console.log(child.key, child.val());
        // Push values to the correct arrays
        concentration.push(child.key);
        absorption.push(child.val());
      });
    }
    else {
      alert('No data found')
    }
  })
  .catch((error) => {
    alert('unsuccessful, error ' + error)
  });

  // Dynamically add table rows to HTML
  tbodyEl.innerHTML = '';
  for(let i = 0; i < concentration.length; i++) {
    addItemToTable(concentration[i], absorption[i], tbodyEl)
  }

} 

// Add an item to the table
function addItemToTable(concentration, absorption, tbody) {
  console.log(concentration, absorption);
  let tRow = document.createElement("tr")   // create table row
  let td1 = document.createElement("td")    // column 1
  let td2 = document.createElement("td")    // column 2

  td1.innerHTML = concentration;
  td2.innerHTML = absorption;

  tRow.appendChild(td1);
  tRow.appendChild(td2);

  tbody.appendChild(tRow);
}

// Delete a single day's data function call
function deleteData(userID, trial, concentration) {
  remove(ref(db, 'users/' + userID + '/data/' + trial + '/' + concentration))
  .then(() => {
    alert('Data removed successfully');
  })
  .catch((error) => {
    alert('unsuccessful, error: ' + error);
  });
}
