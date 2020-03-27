'use strict';
const log = console.log;

const returner = document.querySelector('#return')
const sessionName = sessionStorage.getItem('userName')

if (sessionName) {
    returner.style.visibility = 'visible'
}