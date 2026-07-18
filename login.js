import {
    auth,
    signInWithEmailAndPassword
} from "./firebase.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

    .then(() => {

        alert("Login Successful");

        window.location.href = "appointments.html";

    })

    .catch((error) => {

        alert("Login Failed\n\n" + error.message);

    });

});