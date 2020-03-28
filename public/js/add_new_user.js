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
    const data = JSON.stringify({"username":username,"password":password, "avatar":avatar, "admin":false})

    const url = '/signup';

    if (username && password) {
        const request = new Request(url, {
            method: 'post', 
            body: data,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                alert(`${username} has been added`)
                location.href = "users_list.html"
            } else if (res.status === 400) {
                alert("User already exists")
            } else {
                alert("Could not add user")
            }
            log(res)
        }).catch((error) => {
            log(error)
        })
    } else {
        alert("Enter a username and password")
    }
}

function getAvatar() {
	const avatars = document.getElementsByName('avatar');
	
	for (let i = 0; i < avatars.length; i++) {
		if (avatars[i].checked) {
			return avatars[i].id;
			break;
		}
	}
}