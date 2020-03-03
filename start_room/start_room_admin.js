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
    newMsgBody.appendChild(document.createTextNode("[Admin]: " + msgText))

    chatlog.appendChild(newMsgBody)

    // Clear message in input line
    document.querySelector('#newMsg').value = ""
}

// Get the user and their current position
const char = document.getElementById('brown'),
    style = window.getComputedStyle(char),
    leftStyle = style.getPropertyValue('left'),
    topStyle = style.getPropertyValue('top');

// Set the style attribute to be manipulated 
char.style.left = leftStyle
char.style.top = topStyle

// Event listener for movement
window.addEventListener('keydown', keyActionDown)

function keyActionDown(key) {
    // Check if any arrow keys were pressed
    if (key.keyCode == 37) {
        changePosition("left")
    }
    else if (key.keyCode == 38) {
        changePosition("up")
    }
    else if (key.keyCode == 39) {
        changePosition("right")
    }
    else if (key.keyCode == 40) {
        changePosition("down")
    }
}

function changePosition(pos) {
    const top = parseInt(char.style.top)
    const left = parseInt(char.style.left)

    // If moving the avatar does not place the avatar in an area outside of the world
    // then move the avatar
    if (pos == "up" && top > 10) {
        char.style.top = top - 5 + 'px';
    }
    else if (pos == "down" && top < 285) {
        char.style.top = top + 5 + 'px';
    }
    else if (pos == "left" && left > 35) {
        char.style.left = left - 5 + 'px';
    }
    else if (pos == "right" && left < 515) {
        char.style.left = left + 5 + 'px';
    }
}