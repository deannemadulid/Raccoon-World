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
    const avatars = document.getElementsByName("avatar")
    const avatarsArr = Array.prototype.slice.call(avatars);
    const checkedAvatar = avatarsArr.filter(function(avatar){
        return avatar.checked
    })

    // Check that no input is blank 
    if (password == '' || username == '') {
        log("Please enter a valid username and password")
        return
    }

    // Make sure passwords match
    else if (password != enterPassword) {
        log("Passwords do not match. Try again.")
        return
    }

    // Store data
    const request = new XMLHttpRequest()
    const url = '/signup'
    request.open('POST', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const data = JSON.stringify({"username":username,"password":password, "avatar":checkedAvatar})
    request.send(data)
    // Switch back to first page
    location.href = "index.html"
}
