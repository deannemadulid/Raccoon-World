'use strict';

const worldWindow = document.querySelector('#worldView')
const raccoonsList = worldWindow.getElementsByClassName("raccoon");
const arrowsList = worldWindow.getElementsByClassName("arrow");

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Arrow {
    constructor(x, y, img_path) {
        this.x = x;
        this.y = y;
        this.img_path = "../images/arrows/arrow" + img_path + ".png"
    }
}

const raccoon_positions = [];
raccoon_positions.push(new Coordinates("150px", "100px"));
raccoon_positions.push(new Coordinates("360px", "100px"));
raccoon_positions.push(new Coordinates("225px", "200px"));

const arrows = [];
arrows.push(new Arrow("30px", "10px", "TopLeft"));
arrows.push(new Arrow("545px", "170px", "Right"));
arrows.push(new Arrow("35px", "335px", "BottomLeft"));


function placeRaccoons() {
    for (let i = 0; i < raccoonsList.length; i++) {
        raccoonsList[i].style.left = raccoon_positions[i].x;
        raccoonsList[i].style.top = raccoon_positions[i].y;
    }
}

function placeArrows() {
    for (let i = 0; i < arrowsList.length; i++) {
        arrowsList[i].style.left = arrows[i].x;
        arrowsList[i].style.top = arrows[i].y;
        arrowsList[i].querySelector(".arrowImg").src = arrows[i].img_path;
    }
}

placeRaccoons();
placeArrows();
