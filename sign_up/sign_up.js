'use strict';
const log = console.log;

const create = document.querySelector('#createAccount')

// Add submit event listener
create.addEventListener('submit', createAccount)

function createAccount(e) {
    e.preventDefault();

    // Get inputs from the text fields
    const username = document.querySelector('#uName').value
    const password = document.querySelector('#uPass').value
    const enterPassword = document.querySelector('#uRePass').value

    // Check that no input is blank 
    if (password == '' || username == '') {
        log("Please enter a valid username and password")
    }

    // Make sure passwords match
    else if (password != enterPassword) {
        location.href = "sign_up.html"
        log("Passwords do not match. Try again.")
    }
    
    else {location.href = "index.html"}
}
