import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6wKkpZ9KmRi1_nPmBrvmAk-v5YSLRczo",
  authDomain: "clinic-appointment-72505.firebaseapp.com",
  databaseURL: "https://clinic-appointment-72505-default-rtdb.firebaseio.com",
  projectId: "clinic-appointment-72505",
  storageBucket: "clinic-appointment-72505.firebasestorage.app",
  messagingSenderId: "969154219142",
  appId: "1:969154219142:web:5f40ff23ae2d7cafb95507"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

document.getElementById("appointmentForm").addEventListener("submit",function(e){

e.preventDefault();

const appointment={

name:document.getElementById("name").value,

phone:document.getElementById("phone").value,

doctor:document.getElementById("doctor").value,

date:document.getElementById("date").value,

time:document.getElementById("time").value,

createdAt:new Date().toISOString()

};

push(ref(db,"appointments"),appointment)

.then(()=>{

alert("Appointment Saved Successfully");

document.getElementById("appointmentForm").reset();

})

.catch((error)=>{

alert(error.message);

});

});