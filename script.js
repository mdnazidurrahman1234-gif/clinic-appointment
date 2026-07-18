import {
    db,
    ref,
    push,
    onValue,
    remove
} from "./firebase.js";


// ==========================
// BOOK APPOINTMENT
// ==========================

const form = document.getElementById("appointmentForm");

if (form) {

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
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



// ==========================
// SHOW APPOINTMENTS
// ==========================

const table = document.getElementById("appointmentTable");

if (table) {

    onValue(ref(db, "Appointments"), (snapshot) => {

        table.innerHTML = "";

        if (!snapshot.exists()) {

            table.innerHTML =
            `<tr>
                <td colspan="6">No Appointment Found</td>
            </tr>`;

            return;

        }

        snapshot.forEach((child) => {

            const data = child.val();
            const key = child.key;

            table.innerHTML += `

            <tr>

                <td>${data.name}</td>

                <td>${data.phone}</td>

                <td>${data.doctor}</td>

                <td>${data.date}</td>

                <td>${data.time}</td>

                <td>

                    <button
                    class="delete"
                    onclick="deleteAppointment('${key}')">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    });

}



// ==========================
// DELETE
// ==========================

window.deleteAppointment = function (key) {

    if (confirm("Delete this Appointment?")) {

        remove(ref(db, "Appointments/" + key));

    }

};




// ==========================
// SEARCH
// ==========================

window.searchAppointment = function () {

    const input =
    document.getElementById("search").value.toLowerCase();

    const rows =
    document.querySelectorAll("#appointmentTable tr");

    rows.forEach((row) => {

        const patient =
        row.cells[0].innerText.toLowerCase();

        row.style.display =
        patient.includes(input) ? "" : "none";

    });

};