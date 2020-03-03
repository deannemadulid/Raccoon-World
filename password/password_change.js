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
        // Store new password
        location.href = "../user/user_page.html"
        log("Your password has been changed.")
    }

    // Passwords do not match
    // Refresh page to clear entered information
    else {
        location.href = "password_change.html"
        log("Passwords do not match.")
    }
}