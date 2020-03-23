'use strict';
const log = console.log;

const cancel = document.querySelector('#cancel')
const add_user = document.querySelector('#add_user')

cancel.addEventListener('click', goBack)
add_user.addEventListener('click', addUser)

function goBack(e) {
    e.preventDefault();

    location.href = "users_list.html"
}

function addUser(e) {
	e.preventDefault();

	const username = document.querySelector('#new_username').value
    const password = document.querySelector('#new_password').value
    const avatar = getAvatar()

    if (username && password) {
    	// Check if username already exists in system, if it does, don't accept
    	// Otherwise save username, password, and avatar to the database
    	location.href = "users_list.html"
    } else {
    	log("Enter a username and password")
    }
}

function getAvatar() {
	const avatars = document.getElementsByName('avatar');
	
	for (let i = 0; i < avatars.length; i++) {
		if (avatars[i].checked) {
			return avatars[i];
			break;
		}
	}
}