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

    request.onload = function() {
        log('Status: ',request.status)
        if (request.status === 200) {
            sessionStorage.setItem('userName', username);
            sessionStorage.setItem('userColour', checkedAvatar[0].value.charAt(0).toUpperCase() +  checkedAvatar[0].value.slice(1));
            // Switch back to first page
            location.href = "user.html"
        } else if (request.status === 400) {
            log(request.response)
        } else {
            log('Server error')
        }
    }

    const data = JSON.stringify({"username":username,"password":password, "avatar":checkedAvatar[0].value, "admin":false})
    request.send(data)
    
}
