'use strict';
const log = console.log;

const back = document.querySelector('#back')
const chat = document.querySelector('#chat_table')
const purge = document.querySelector("#purge")

createChatTable();

back.addEventListener('click', backToUser)
purge.addEventListener('click', purgeChat)

function purgeChat(e) {
    e.preventDefault();
	const url = '/chatlog';
	const request = new XMLHttpRequest()
	request.open('DELETE', url)

	request.onload = function() {
		log(request.status)
		if (request.status === 200) {
			location.reload()
		}
		else {
			log('Server error:', request.error)
		}
	}
	request.send()
}

function backToUser(e) {
    e.preventDefault();

    location.href = "user.html"
}

function createChatTable() {
	const url = '/chatlog';
	fetch(url).
	then((res) => {
		if (res.status === 200) {
			return res.json()
		} else {
			alert('Could not get users')
		}
	})
	.then((allChats) => {
		// Display all chat messages
		const validChats = allChats.chats.filter((c) => c.user && c.msg)
		for (let i = 0; i < validChats.length; i++) {
			const new_row = createRow(i, validChats)
			chat.appendChild(new_row)
		}
	}).catch((error) => {
		log(error)
	})
}

function createRow(i, allChats) {
	const new_row = document.createElement("tr")

	const date = document.createElement("th")
	date.classList.add("date")
	date.setAttribute("align", "right")
	date.setAttribute("valign", "top")
	const newDate = new Date(allChats[i].time)
	date.appendChild(document.createTextNode(newDate.toLocaleString()))
		
	const user = document.createElement("th")
	user.classList.add("userName")
	user.setAttribute("align", "right")
	user.setAttribute("valign", "top")
	user.appendChild(document.createTextNode(allChats[i].user + ':'))

	const msg = document.createElement("th")
	msg.classList.add("message")
	msg.setAttribute("align", "left")
	msg.appendChild(document.createTextNode(allChats[i].msg))

	new_row.appendChild(user)
	new_row.appendChild(msg)
	new_row.appendChild(date)

	return new_row
}