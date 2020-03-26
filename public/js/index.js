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

    const request = new XMLHttpRequest()
    const url = '/login'
    request.open('GET', url, true)
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sessionStorage.setItem('userName', username);
                location.href = "user.html"
            } else {
                console.error(request.statusText)
            }
        }
    }
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const data = JSON.stringify({"username":username,"password":password})
    request.send(data)
}
