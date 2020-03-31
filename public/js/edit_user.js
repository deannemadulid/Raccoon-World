'use strict';
const log = console.log;

const cancel = document.querySelector('#cancel')
const save_changes = document.querySelector('#save_changes')
const edit_username = document.querySelector('#edit_username')
const edit_password = document.querySelector('#edit_password')
const edit_avatar = document.querySelector('#edit_avatar')
const delete_user = document.querySelector('#delete_user')

cancel.addEventListener('click', goBack)
save_changes.addEventListener('click', saveChanges)
edit_username.addEventListener('click', editUserName)
edit_password.addEventListener('click', editPassword)
edit_avatar.addEventListener('click', editAvatar)
delete_user.addEventListener('click', deleteUser)

loadPage()

function goBack(e) {
    e.preventDefault();

    location.href = "users_list.html"
}

function saveChanges(e) {
	e.preventDefault();

    const oldUsername = document.querySelector('#user').textContent
	const username = document.querySelector('#new_username').value
    const change_password = document.getElementById('change_password')
    const password = document.querySelector('#new_password').value
    const avatar = getAvatar().value

    const passwordDisplay = window.getComputedStyle(change_password).getPropertyValue("display");
    if (!username) {
        alert("Enter a username")
        return
    } else if (passwordDisplay !== "none" && !password) {
        alert("Enter a password")
        return
    }

    const url = '/users'
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        }
    })
    .then((json) => {
        const userExist = json.filter((user) => user.username === username)
        if (oldUsername === username || userExist.length === 0) {
            return true
        } else {
            return false
        }
    }).then((result) => {
        if (result === false) {
            alert("The username is already taken")
            return
        }

        updateUser(oldUsername, username, avatar, password)
    }).catch((error) => {
        log(error)
    })
}

function updateUser(oldUser, newUser, avatar, password) {
    const url = '/users/' + oldUser + '/edit';

    let data = {
        username: newUser,
        avatar: avatar,
        password: password
    }

    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br'
        },
    });

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            alert("Changes have been saved")
            location.href = "users_list.html"
        }
    }).catch((error) => {
        alert("Could not save changes")
        log(error)
    })
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

function editUserName(e) {
    e.preventDefault();

    const new_username = document.getElementById('new_username')

    new_username.disabled = false;
    new_username.style.cursor = "auto";
    new_username.style.backgroundColor = "white";
    edit_username.style.display = "none";
}

function editPassword(e) {
    e.preventDefault();

    const change_password = document.getElementById('change_password')

    change_password.style.display = "inline-block";
    edit_password.style.display = "none";
}

function editAvatar(e) {
    e.preventDefault();

    const raccoons = document.getElementById('raccoons')

    raccoons.style.display = "block"
}

function deleteUser(e) {
    e.preventDefault();

    const user = document.querySelector('#user').textContent
    log(user)
    if (confirm(`Are you sure you want to delete ${user}`)) {
        // Delete user
        location.href = "users_list.html"
    }
}

function loadPage() {
    const username = sessionStorage.getItem('editUser');
    sessionStorage.setItem('editUser', '')

    const url = '/users/' + username;
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        } else {
            alert('Could not get user')
        }
    })
    .then((user) => {
        const userTitle = document.querySelector('#user')
        userTitle.appendChild(document.createTextNode(user.username))

        const currAvatar = document.querySelector('#curr_avatar')
        const src = "images/raccoon" + user.avatar.charAt(0).toUpperCase() + user.avatar.slice(1) + ".png"
        currAvatar.setAttribute("src", src)

        const avatars = document.getElementsByName('avatar');
        for (let i = 0; i < avatars.length; i++) {
            if (user.avatar === avatars[i].value) {
                avatars[i].checked = true;
                break;
            }
        }

        const usernameField = document.querySelector('#new_username')
        usernameField.value = user.username

    }).catch((error) => {
        log(error)
    })
}