'use strict';
const log = console.log;

const logIn = document.querySelector('#signIn')

// Add submit event listener
logIn.addEventListener('submit', signIn)

function signIn(e) {
    e.preventDefault();

    // Get inputs from the text fields
    const username = document.querySelector('#uName').value
    const password = document.querySelector('#uPass').value

    // Check if user
    if (username == "user" & password == "user") {
        location.href = "user.html"
    }

    // Check if admin
    else if (username == "admin" & password == "admin") {
        location.href = "admin.html"
    }
    
    // Input not valid
    else {
        location.href = "index.html"
        log("Username or password invalid. Try again.")
    }
}
