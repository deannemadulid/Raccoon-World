'use strict';
const log = console.log;

const chat = document.querySelector('#chat')

// Event listener to add new message
chat.addEventListener('click', addMsgByClick)

// Event listener when pressing Enter
document.querySelector('#newMsg').addEventListener('keypress', addMsgByEnter)

function addMsgByClick(e) {
    e.preventDefault();

    // Check that the 'post' button was the target
    if (e.target == document.querySelector('#newMsgSubmit')) {
        addMessage()
    }
}

function addMsgByEnter(e) {
    // Check that Enter key was pressed
    if (e.key === 'Enter') {
        addMessage()
    }
}

function addMessage() {
    // Get message input
    const msgText = document.querySelector('#newMsg').value;
    if (msgText == "") {
        log('empty message')
        return
    }
    log("adding \"" + msgText + "\" to chatlog")

    // Create new message in chatlog
    const newMsgBody = document.createElement('li')
    newMsgBody.classList.add('chatMsg')
    newMsgBody.appendChild(document.createTextNode("[User]: " + msgText))

    const chatlog = chat.firstElementChild
    chatlog.appendChild(newMsgBody)

    // Clear message in input line
    document.querySelector('#newMsg').value = ""
}