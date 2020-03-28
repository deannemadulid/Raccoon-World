'use strict';
const log = console.log;

const uName = sessionStorage.getItem('userName');
const uColour = sessionStorage.getItem('userColour');

const title = document.querySelector('#userName');
title.appendChild(document.createTextNode(uName));

const raccoonImg = document.querySelector('#raccoon');
raccoonImg.src = "images/raccoon" + uColour + ".png";