'use strict';
const log = console.log;

const uName = sessionStorage.getItem('userName');
const uColour = sessionStorage.getItem('userColour');
const admin = sessionStorage.getItem('admin');

const title = document.querySelector('#userName');
title.appendChild(document.createTextNode(uName));

const raccoonImg = document.querySelector('#raccoon');
raccoonImg.src = "images/raccoon" + uColour + ".png";

const modifyUsersButton = document.getElementById('modifyUsers')

if (admin === 'true') {
	modifyUsersButton.style.display = "block"
} else {
	modifyUsersButton.style.display = "none"
}