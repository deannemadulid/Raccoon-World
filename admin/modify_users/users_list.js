'use strict';
const log = console.log;

const cancel = document.querySelector('#add_user_button')

cancel.addEventListener('click', addUserPage)

function addUserPage(e) {
    e.preventDefault();

    location.href = "add_new_user.html"
}