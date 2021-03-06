'use strict';
const log = console.log;

const cancel = document.querySelector('#add_user_button')
const users = document.querySelector('#user_table')
const usernames = document.getElementsByClassName("username")
const search_button = document.querySelector('#search_button')
const clear_button = document.querySelector('#clear_button')
const search_table = document.querySelector('#search_table')

createUserTable();

cancel.addEventListener('click', addUserPage)
users.addEventListener('click', editUserPage)
search_button.addEventListener('click', search)
clear_button.addEventListener('click', clearSearch)

function addUserPage(e) {
    e.preventDefault();

    location.href = "add_new_user.html"
}

function editUserPage(e) {
    e.preventDefault();

    // Check if the 'edit user' button was clicked
    if (e.target.classList.contains('modify_user_button')) {
    	const userRow = e.target.parentElement.parentElement
		const user = userRow.cells[1].textContent // username of user to modify
		sessionStorage.setItem('editUser', user);

    	location.href = "edit_user.html"
    }
}

function search(e) {
	e.preventDefault();

	const search_user = document.querySelector('#search_user').value
	const searchUser = RegExp(search_user)

	const url = '/users';
	fetch(url)
	.then((res) => {
		if (res.status === 200) {
			return res.json()
		} else {
			alert('Could not get users')
		}
	})
	.then((json) => {
		const searchResults = json.filter((user) => user.admin === false && searchUser.test(user.username))

		while (search_table.childNodes.length > 0) {
			search_table.removeChild(search_table.childNodes[0])
		}

		const no_results = document.querySelector('#no_results')
		if (no_results.childNodes.length > 0) {
			no_results.removeChild(no_results.childNodes[0])
		}

		users.style.display = "none";
		clear_button.style.display = "inline-block";
		
		for (let i = 0; i < searchResults.length; i++) {
			const user_row = createRow(i, searchResults)
			search_table.appendChild(user_row)
		}
		search_table.display = "table"

		if (search_table.childNodes.length === 0) {
			no_results.appendChild(document.createTextNode('No user "' + search_user + '" found'))
			no_results.style.display = 'block'
		}
	}).catch((error) => {
		log(error)
	})
}

function clearSearch(e) {
	e.preventDefault();

	document.querySelector('#search_user').value = "";
	users.style.display = "table";
	clear_button.style.display = "none";
	
	while (search_table.childNodes.length > 0) {
		search_table.removeChild(search_table.childNodes[0])
	}

	const no_results = document.querySelector('#no_results')
	if (no_results.childNodes.length > 0) {
		no_results.removeChild(no_results.childNodes[0])
	}
	no_results.style.display = 'none'

}

function createUserTable() {
	const url = '/users';
	fetch(url).
	then((res) => {
		if (res.status === 200) {
			return res.json()
		} else {
			alert('Could not get users')
		}
	})
	.then((json) => {
		// Display only non-admin users
		const allUsers = json.filter((user) => user.admin === false)
		
		for (let i = 0; i < allUsers.length; i++) {
			const new_row = createRow(i, allUsers)
			users.appendChild(new_row)
		}
	}).catch((error) => {
		log(error)
	})
}

function createRow(i, allUsers) {
	const new_row = document.createElement("tr")
		
	const col1 = document.createElement("th")
	const avatar = document.createElement("img")
	avatar.setAttribute("class", "avatar")
	const colour = allUsers[i].avatar
	const src = "images/raccoon" + colour.charAt(0).toUpperCase() + colour.slice(1) + ".png"
	avatar.setAttribute("src", src)
	col1.appendChild(avatar)

	const col2 = document.createElement("th")
	const username = document.createElement("span")
	username.setAttribute("class", "username")
	username.appendChild(document.createTextNode(allUsers[i].username))
	col2.appendChild(username)

	const col3 = document.createElement("th")
	const button = document.createElement("button")
	button.setAttribute("class", "modify_user_button")
	button.appendChild(document.createTextNode("Edit User"))
	col3.appendChild(button)

	new_row.appendChild(col1)
	new_row.appendChild(col2)
	new_row.appendChild(col3)

	return new_row
}