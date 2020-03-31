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

    // No password enetered
    if (pass == '') {
        log("You must enter a valid password.")
        document.getElementById("error").style.display = "block"
        return
    }

    // Passwords do not match
    else if (pass !== rePass) {
        log("Passwords do not match.")
        document.getElementById("error").innerHTML = "Passwords do not match. Try again."
        document.getElementById("error").style.display = "block"
        return
    }

    const request = new XMLHttpRequest()
    const url = '/signup'
    request.open('PATCH', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
        log('Status: ',request.status)
        if (request.status === 200) {
            location.href = "user_page.html"
        } else if (request.status === 400) {
            log(request.response)
        } else {
            log('Server error')
        }
    }

    const username = sessionStorage.getItem('userName')
    const avatar = sessionStorage.getItem('userColour')
    const data = JSON.stringify({"username": username, "avatar": avatar, "password":pass})
    request.send(data)
}