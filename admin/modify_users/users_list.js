'use strict';
const log = console.log;

const cancel = document.querySelector('#add_user_button')
const users = document.querySelector('#user_table')

cancel.addEventListener('click', addUserPage)
users.addEventListener('click', editUserPage)

function addUserPage(e) {
    e.preventDefault();

    location.href = "add_new_user.html"
}

function editUserPage(e) {
    e.preventDefault();
    log(e.target.classList)

    // Check if the 'edit user' button was clicked
    if (e.target.classList.contains('modify_user_button')) {
    	const userRow = e.target.parentElement.parentElement
		const user = userRow.cells[1].textContent // username of user to modify

    	location.href = "edit_user.html"
    }
}