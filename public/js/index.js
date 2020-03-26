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
    request.open('POST', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const data = JSON.stringify({"username":username,"password":password})
    request.send(data)

    sessionStorage.setItem('userName', username);
}
