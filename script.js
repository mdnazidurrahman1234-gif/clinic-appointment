import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "clinic-appointment-72505.firebaseapp.com",
  databaseURL: "https://clinic-appointment-72505-default-rtdb.firebaseio.com",
  projectId: "clinic-appointment-72505",
  storageBucket: "clinic-appointment-72505.firebasestorage.app",
  messagingSenderId: "969154219142",
  appId: "1:969154219142:web:5f40ff23ae2d7cafb95507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// =============================
// BOOK APPOINTMENT
// =============================

const form = document.getElementById("appointmentForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const doctor = document.getElementById("doctor").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        push(ref(db, "Appointments"), {

            name,
            phone,
            doctor,
            date,
            time

        })

        .then(() => {

            alert("Appointment Saved Successfully!");

            form.reset();

        })

        .catch((error) => {

            alert(error.message);

        });

    });

}


// =============================
// SHOW APPOINTMENTS
// =============================

const table = document.getElementById("appointmentTable");

if (table) {

    const appointmentRef = ref(db, "Appointments");

    onValue(appointmentRef, (snapshot) => {

        table.innerHTML = "";

        if (!snapshot.exists()) {

            table.innerHTML = `
            <tr>
                <td colspan="6">No Appointment Found</td>
            </tr>
            `;

            return;
        }

        snapshot.forEach((childSnapshot) => {

            const key = childSnapshot.key;
            const data = childSnapshot.val();

            table.innerHTML += `

            <tr>

                <td>${data.name}</td>

                <td>${data.phone}</td>

                <td>${data.doctor}</td>

                <td>${data.date}</td>

                <td>${data.time}</td>

                <td>

                    <button class="delete"
                    onclick="deleteAppointment('${key}')">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    });

}



// =============================
// DELETE
// =============================

window.deleteAppointment = function (key) {

    if (confirm("Delete this appointment?")) {

        remove(ref(db, "Appointments/" + key))

        .then(() => {

            alert("Appointment Deleted!");

        })

        .catch((error) => {

            alert(error.message);

        });

    }

};



// =============================
// SEARCH
// =============================

window.searchAppointment = function () {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let rows = document.querySelectorAll("#appointmentTable tr");

    rows.forEach((row) => {

        let text = row.cells[0].innerText.toLowerCase();

        if (text.includes(input)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

};