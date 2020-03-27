'use strict';
const log = console.log;

const pink = document.querySelector('#pink')
const brown = document.querySelector('#brown')
const green = document.querySelector('#green')
const blue = document.querySelector('#blue')
const red = document.querySelector('#red')
const yellow = document.querySelector('#yellow')
const allColours = [pink, brown, green, blue, red, yellow]

const confirmed = document.querySelector('#selectAvatar')

confirmed.addEventListener('click', confirmation)

function confirmation(e) {
    e.preventDefault()
    const colour = {}
    for (let i = 0; i < allColours.length; i++) {
        if (allColours[i].checked) {
            colour.colour = allColours[i].value
        }
    }
    sessionStorage.setItem('userColour', colour.colour.charAt(0).toUpperCase() + colour.colour.slice(1))

    const request = new XMLHttpRequest()
    const url = '/signup'
    request.open('PATCH', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
        log('Status: ',request.status)
        if (request.status === 200) {
            location.href = "user.html"
        } else if (request.status === 400) {
            log(request.response)
        } else {
            log('Server error')
        }
    }

    const data = JSON.stringify({"username": sessionStorage.getItem('userName'),"avatar":colour.colour})
    request.send(data)
}