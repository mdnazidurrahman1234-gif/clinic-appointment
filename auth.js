import {
    auth,
    onAuthStateChanged,
    signOut
} from "./firebase.js";

// Login Check
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
    }

});

// Logout Function
window.logout = function () {

    signOut(auth)
    .then(() => {

        alert("Logged Out Successfully");

        window.location.href = "login.html";

    })
    .catch((error) => {

        alert(error.message);

    });

};