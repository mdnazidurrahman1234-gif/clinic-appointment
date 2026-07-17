// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase Configuration
const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



let appointmentData = [];



// Load appointments

async function loadAppointments(){


    const table = document.getElementById("appointmentTable");

    table.innerHTML="";


    const querySnapshot = await getDocs(
        collection(db,"appointments")
    );



    appointmentData=[];


    querySnapshot.forEach((doc)=>{


        let data = doc.data();


        appointmentData.push({

            id:doc.id,

            ...data

        });


    });



    displayAppointments(appointmentData);


}




// Show table data

function displayAppointments(data){


    const table=document.getElementById("appointmentTable");


    table.innerHTML="";



    data.forEach(item=>{


        let row=document.createElement("tr");



        row.innerHTML=`

        <td>${item.patient || ""}</td>

        <td>${item.phone || ""}</td>

        <td>${item.doctor || ""}</td>

        <td>${item.date || ""}</td>

        <td>${item.time || ""}</td>


        <td>

        <button class="delete"
        onclick="deleteAppointment('${item.id}')">

        Delete

        </button>

        </td>


        `;



        table.appendChild(row);



    });


}





// Search by name or phone

window.searchAppointment=function(){


    let value=document
    .getElementById("search")
    .value
    .toLowerCase()
    .trim();



    let result=appointmentData.filter(item=>{


        let name=(item.patient || "")
        .toLowerCase();



        let phone=(item.phone || "")
        .toLowerCase();



        return (

            name.includes(value)

            ||

            phone.includes(value)

        );


    });



    displayAppointments(result);


}





// Delete appointment

window.deleteAppointment=async function(id){


    if(confirm("Delete this appointment?")){


        await deleteDoc(
            doc(db,"appointments",id)
        );


        loadAppointments();


    }


}





// Start

loadAppointments();