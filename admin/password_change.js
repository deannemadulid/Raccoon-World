'use strict';
const log = console.log;

const changePass = document.querySelector('#changePassword')

// Add submit event listener
changePass.addEventListener('submit', changePassword)

function changePassword(e) {
    e.preventDefault();

    // Get inputs from the text fields
    const pass = document.querySelector('#newPass').value
    const rePass = document.querySelector('#newPassRe').value

    if (pass == '') {
        location.href = "password_change.html"
        log("You must enter a valid password.")
    }
    // Check if passwords match
    else if (pass == rePass) {
        location.href = "admin_page.html"
        log("Your password has been changed.")
    }

    // Passwords do not match
    else {
        location.href = "password_change.html"
        log("Passwords do not match.")
    }
}