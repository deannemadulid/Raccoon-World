'use strict';
const log = console.log;
const CHAT_REFRESH_RATE = 3000;

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

const uName = sessionStorage.getItem('userName');
let lastMessage = new Date();

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
    displayMessage(uName, msgText);

    // Clear message in input line
    document.querySelector('#newMsg').value = ""

    log(new Date() + ', ' + uName + ': ' + msgText) // To add to global chatlog

    const request = new XMLHttpRequest()
    const url = '/chatlog'
    request.open('POST', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const data = JSON.stringify({"time":new Date(),"user":uName, "msg":msgText})
    request.send(data)
}

function displayMessage(user, msgText) {
    const newMsgBody = document.createElement('li')
    newMsgBody.classList.add('chatMsg')
    newMsgBody.appendChild(document.createTextNode(user + ": " + msgText))

    chatlog.appendChild(newMsgBody)
}

function getMessages() {
    setTimeout(function(){ getMessages(); }, CHAT_REFRESH_RATE);
    // the URL for the request
    const url = '/chatlog';
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json()
       } else {
            alert('Could not get chats')
       }
    })
    .then((json) => {  // the resolved promise with the JSON body
        let finalMessage = lastMessage;
        let currentMessage = null
        json.chats.map((s) => {
            currentMessage = new Date(s.time)
            if (currentMessage > lastMessage) {
                if (s.user != uName) {
                    displayMessage(s.user, s.msg)
                }
                if (currentMessage > finalMessage) {
                    finalMessage = currentMessage
                }
            }
        })
        lastMessage = finalMessage;
    }).catch((error) => {
        log(error)
    })
}

setTimeout(function(){ getMessages(); }, CHAT_REFRESH_RATE);
