'use strict';

const worldWindow = document.querySelector('#worldView')
const raccoonsList = worldWindow.getElementsByClassName("raccoon");
const arrowsList = worldWindow.getElementsByClassName("arrow");

worldWindow.addEventListener("click", moveRaccoon);

class Coordinates {
    constructor(x, y) {
        this.x = x + "px";
        this.y = y + "px";
    }
}

class Arrow extends Coordinates {
    constructor(x, y, img_path) {
        super(x, y);
        this.img_path = "../images/arrows/arrow" + img_path + ".png";
    }
}

const raccoon_positions = [];
const arrows = [];

function loadRoom1() {
    worldWindow.querySelector(".backdrop").src = "../images/temp_room.png";

    raccoon_positions.length = 0;
    raccoon_positions.push(new Coordinates(150, 100));
    raccoon_positions.push(new Coordinates(360, 100));
    raccoon_positions.push(new Coordinates(225, 200));

    arrows.length = 0;
    arrows.push(new Arrow(30, 10, "TopLeft"));
    arrows.push(new Arrow(545, 170, "Right"));
    arrows.push(new Arrow(35, 335, "BottomLeft"));

    placeRaccoons();
    placeArrows();

}

function placeRaccoons() {
    for (let i = 0; i < raccoonsList.length && i < raccoon_positions.length; i++) {
        raccoonsList[i].style.left = raccoon_positions[i].x;
        raccoonsList[i].style.top = raccoon_positions[i].y;
        raccoonsList[i].style.visibility = "visible"
    }
}

function placeArrows() {
    for (let i = 0; i < arrows.length; i++) {
        arrowsList[i].style.left = arrows[i].x;
        arrowsList[i].style.top = arrows[i].y;
        arrowsList[i].querySelector(".arrowImg").src = arrows[i].img_path;
        arrowsList[i].style.visibility = "visible"
    }
}

function moveRaccoon(e) {
    if (e.target.className != "arrowImg") {
        const movingRaccoon = raccoonsList[0];
        const worldRect = worldWindow.getBoundingClientRect();
        const newX = e.clientX - worldRect.left - (movingRaccoon.offsetWidth / 2);
        const newY = e.clientY - worldRect.top - (movingRaccoon.offsetHeight / 3);
        movingRaccoon.style.left = newX + "px";
        movingRaccoon.style.top = newY + "px";
    }
}

loadRoom1();
