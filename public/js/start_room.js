'use strict';
const log = console.log;

const chat = document.querySelector('#chat')
const chatlog = chat.firstElementChild
let chatScrolled = false

// Check whether or not the chatlog is scrolled down fully
chatlog.addEventListener('scroll', function(){
    if (chatlog.scrollTop == chatlog.scrollHeight - chatlog.clientHeight) {
        chatScrolled = false
    }
    else { chatScrolled = true }
})

// Force chatlog to scroll to most recent message, unless client scrolled
window.setInterval(function() {
    if (!chatScrolled) {
        chatlog.scrollTop = chatlog.scrollHeight
    }
}, 0)

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

    chatlog.appendChild(newMsgBody)

    // Clear message in input line
    document.querySelector('#newMsg').value = ""
}