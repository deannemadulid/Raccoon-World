'use strict';

const worldWindow = document.querySelector('#worldView')
const raccoonsList = worldWindow.getElementsByClassName("raccoon");

worldWindow.addEventListener("click", moveRaccoon);

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
const arrows = [];

function loadRoom1() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room.png";
    clearRoom();

    raccoon_positions.push(new Coordinates(150, 100));
    raccoon_positions.push(new Coordinates(360, 100));
    raccoon_positions.push(new Coordinates(225, 200));

    raccoons.push(new Raccoon("Green", uName));
    raccoons.push(new Raccoon("Pink", "George"));
    raccoons.push(new Raccoon("Brown", "Admin"));

    arrows.push(new Arrow(30, 10, "TopLeft", loadRoom4));
    arrows.push(new Arrow(545, 170, "Right", loadRoom2));
    arrows.push(new Arrow(35, 335, "BottomLeft", loadRoom3));

    placeRaccoons();
    placeArrows();

}

function loadRoom2() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room2.png";
    clearRoom();

    raccoon_positions.push(new Coordinates(150, 100));
    raccoon_positions.push(new Coordinates(360, 100));
    raccoon_positions.push(new Coordinates(225, 200));

    raccoons.push(new Raccoon("Green", uName));

    arrows.push(new Arrow(10, 170, "Left", loadRoom1));

    placeRaccoons();
    placeArrows();

}

function loadRoom3() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room3.png";
    clearRoom();

    raccoon_positions.push(new Coordinates(150, 100));
    raccoon_positions.push(new Coordinates(360, 100));
    raccoon_positions.push(new Coordinates(225, 200));

    raccoons.push(new Raccoon("Green", uName));

    arrows.push(new Arrow(515, 15, "TopRight", loadRoom1));

    placeRaccoons();
    placeArrows();

}

function loadRoom4() {
    worldWindow.querySelector(".backdrop").src = "images/temp_room4.png";
    clearRoom();

    raccoon_positions.push(new Coordinates(150, 100));
    raccoon_positions.push(new Coordinates(360, 100));
    raccoon_positions.push(new Coordinates(225, 200));

    raccoons.push(new Raccoon("Green", uName));
    raccoons.push(new Raccoon("Red", "Mary"));

    arrows.push(new Arrow(515, 330, "BottomRight", loadRoom1));

    placeRaccoons();
    placeArrows();

}

function placeRaccoons() {
    for (let i = 0; i < raccoons.length && i < raccoon_positions.length; i++) {
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

function clearRoom() {
    raccoon_positions.length = 0;
    raccoons.length = 0;
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
        const newX = e.clientX - worldRect.left - (movingRaccoon.offsetWidth / 2);
        const newY = e.clientY - worldRect.top - (movingRaccoon.offsetHeight / 3);
        movingRaccoon.style.left = newX + "px";
        movingRaccoon.style.top = newY + "px";
    }
}

loadRoom1();
