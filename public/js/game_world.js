'use strict';
const GAME_REFRESH_RATE = 5000;

const worldWindow = document.querySelector('#worldView')
const raccoonsList = worldWindow.getElementsByClassName("raccoon");

worldWindow.addEventListener("click", moveRaccoon);

const uColour = sessionStorage.getItem('userColour');
let currentRoom = 1;

class Coordinates {
    constructor(x, y) {
        this.x = x + "px";
        this.y = y + "px";
    }
}

class Raccoon {
    constructor(colour, name) {
        this.img_path = "images/raccoon" + colour + ".png";
        this.name = name;
    }
}

class Arrow extends Coordinates {
    constructor(x, y, img_path, click_func) {
        super(x, y);
        this.img_path = "images/arrows/arrow" + img_path + ".png";
        this.click_func = click_func;
    }
}

const raccoon_positions = [];
const raccoons = [];
raccoons.push(new Raccoon(uColour, uName));
const arrows = [];
let playerPos = new Coordinates(0, 0);

function loadRoom1() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room.png";
    clearRoom();
    currentRoom = 1;

    raccoon_positions.push(new Coordinates(110, 95));
    raccoon_positions.push(new Coordinates(190, 200));
    raccoon_positions.push(new Coordinates(270, 95));
    raccoon_positions.push(new Coordinates(350, 200));
    raccoon_positions.push(new Coordinates(430, 95));

    arrows.push(new Arrow(30, 10, "TopLeft", loadRoom4));
    arrows.push(new Arrow(545, 170, "Right", loadRoom2));
    arrows.push(new Arrow(35, 335, "BottomLeft", loadRoom3));

    playerPos = raccoon_positions[0];
    placePlayer()
    checkRaccoonPresence();
    signalRaccoonPresence(1);

    placeArrows();

}

function loadRoom2() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room2.png";
    clearRoom();
    currentRoom = 2;

    raccoon_positions.push(new Coordinates(110, 95));
    raccoon_positions.push(new Coordinates(190, 200));
    raccoon_positions.push(new Coordinates(270, 95));
    raccoon_positions.push(new Coordinates(350, 200));
    raccoon_positions.push(new Coordinates(430, 95));

    arrows.push(new Arrow(10, 170, "Left", loadRoom1));

    playerPos = raccoon_positions[0];
    placePlayer()
    checkRaccoonPresence();
    signalRaccoonPresence(2);

    placeArrows();

}

function loadRoom3() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room3.png";
    clearRoom();
    currentRoom = 3;

    raccoon_positions.push(new Coordinates(110, 95));
    raccoon_positions.push(new Coordinates(190, 200));
    raccoon_positions.push(new Coordinates(270, 95));
    raccoon_positions.push(new Coordinates(350, 200));
    raccoon_positions.push(new Coordinates(430, 95));

    arrows.push(new Arrow(515, 15, "TopRight", loadRoom1));

    playerPos = raccoon_positions[0];
    placePlayer()
    checkRaccoonPresence();
    signalRaccoonPresence(3);

    placeArrows();

}

function loadRoom4() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room4.png";
    clearRoom();
    currentRoom = 4;

    raccoon_positions.push(new Coordinates(110, 95));
    raccoon_positions.push(new Coordinates(190, 200));
    raccoon_positions.push(new Coordinates(270, 95));
    raccoon_positions.push(new Coordinates(350, 200));
    raccoon_positions.push(new Coordinates(430, 95));

    arrows.push(new Arrow(515, 330, "BottomRight", loadRoom1));

    playerPos = raccoon_positions[0];
    placePlayer()
    checkRaccoonPresence();
    signalRaccoonPresence(4);

    placeArrows();

}

function deletePreviousSignal() {
    const request = new XMLHttpRequest()
    const url = '/onlineUsers'
    request.open('DELETE', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const data = JSON.stringify({"username":uName})
    request.send(data)
}

function signalRaccoonPresence(roomNum) {
    deletePreviousSignal()
    const request = new XMLHttpRequest()
    const url = '/onlineUsers'
    request.open('POST', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const data = JSON.stringify({"time":new Date(),"username":uName, "avatar":uColour, "room":roomNum})
    request.send(data)
}

function checkRaccoonPresence() {
    // the URL for the request
    const url = '/onlineUsers';
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json()
       } else {
            alert('Could not get students')
       }
    })
    .then((json) => {  // the resolved promise with the JSON body
        let i = 1;
        clearRaccoons();
        json.onlineUsers.map((s) => {
            if (s.room == currentRoom && ((new Date()) - new Date(s.time)) <= GAME_REFRESH_RATE && s.username != raccoons[0].name) {
                const newRaccoon = new Raccoon(s.avatar, s.username)
                raccoons.push(newRaccoon);
            }
        })
        placeRaccoons();
    }).catch((error) => {
        log(error)
    })
}

function placePlayer() {
    const newRaccoon = createRaccoon();
    newRaccoon.querySelector(".raccoonImg").src = raccoons[0].img_path;
    newRaccoon.querySelector(".raccoonName").appendChild(document.createTextNode(raccoons[0].name));
    newRaccoon.style.left = playerPos.x;
    newRaccoon.style.top = playerPos.y;
    newRaccoon.style.visibility = "visible"
}

function placeRaccoons() {
    for (let i = 1; i < raccoons.length && i < raccoon_positions.length; i++) {
        const newRaccoon = createRaccoon();
        newRaccoon.querySelector(".raccoonImg").src = raccoons[i].img_path;
        newRaccoon.querySelector(".raccoonName").appendChild(document.createTextNode(raccoons[i].name));
        newRaccoon.style.left = raccoon_positions[i].x;
        newRaccoon.style.top = raccoon_positions[i].y;
        newRaccoon.style.visibility = "visible"
    }
}

function createRaccoon() {
    const newRaccoon = document.createElement("div");
    const newImg = document.createElement("img");
    const newText = document.createElement("p");
    newRaccoon.classList.add("raccoon");
    newImg.classList.add("raccoonImg");
    newText.classList.add("raccoonName");
    newText.appendChild(document.createTextNode(""));
    newRaccoon.appendChild(newImg);
    newRaccoon.appendChild(newText);
    worldWindow.appendChild(newRaccoon);
    return newRaccoon;
}

function placeArrows() {
    for (let i = 0; i < arrows.length; i++) {
        const newArrow = createArrow();
        newArrow.style.left = arrows[i].x;
        newArrow.style.top = arrows[i].y;
        newArrow.querySelector(".arrowImg").src = arrows[i].img_path;
        newArrow.onclick = arrows[i].click_func;
        newArrow.style.visibility = "visible"
    }
}

function createArrow() {
    const newArrow = document.createElement("div");
    const newImg = document.createElement("img");
    newArrow.classList.add("arrow");
    newImg.classList.add("arrowImg");
    newArrow.appendChild(newImg);
    worldWindow.appendChild(newArrow);
    return newArrow;
}

function clearRaccoons() {
    raccoons.length = 1;
    const toRemove = [];
    for (let i = 0; i < worldWindow.children.length; i++) {
        if (worldWindow.children[i].classList.contains("raccoon")) {
            toRemove.push(worldWindow.children[i]);
        }
    }
    for (let i = 0; i < toRemove.length; i++) {
        toRemove[i].remove();
    }
    placePlayer(playerPos);
}

function clearRoom() {
    raccoon_positions.length = 0;
    raccoons.length = 1;
    arrows.length = 0;
    const toRemove = [];
    for (let i = 0; i < worldWindow.children.length; i++) {
        if (worldWindow.children[i].classList.contains("arrow") ||
      worldWindow.children[i].classList.contains("raccoon")) {
            toRemove.push(worldWindow.children[i]);
        }
    }
    for (let i = 0; i < toRemove.length; i++) {
        toRemove[i].remove();
    }
}

function moveRaccoon(e) {
    if (e.target.className != "arrowImg" && raccoonsList.length > 0) {
        const movingRaccoon = raccoonsList[0];
        const worldRect = worldWindow.getBoundingClientRect();
        const playerX = e.clientX - worldRect.left - (movingRaccoon.offsetWidth / 2);
        const playerY = e.clientY - worldRect.top - (movingRaccoon.offsetHeight / 3);
        movingRaccoon.style.left = playerX + "px";
        movingRaccoon.style.top = playerY + "px";
        playerPos = new Coordinates(playerX,playerY)
    }
}

function gameTick() {
    setTimeout(function(){ gameTick(); }, GAME_REFRESH_RATE);
    signalRaccoonPresence(currentRoom);
    checkRaccoonPresence();
}

loadRoom1();
setTimeout(function(){ gameTick(); }, GAME_REFRESH_RATE);
