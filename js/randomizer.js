'use strict';
var nameInput = document.getElementById('name');
var addButton = document.getElementById('add');

var listWrapper = document.getElementById('list');
var winnersWrapper = document.getElementById('winners');

var decreaseButton = document.getElementById('decrease');
var increaseButton = document.getElementById('increase');
var numberField = document.getElementById('number');

var chooseButton = document.getElementById('choose');
var cleanButton = document.getElementById('clean');

addButton.addEventListener('click', function() {
  if (nameInput.value.trim() !== '') {
    var divElem = document.createElement('div');
    divElem.classList.add("item");
    divElem.innerHTML = nameInput.value + '<button type="button" class="delete"></button>';
    listWrapper.append(divElem);
    nameInput.value = '';
  }
});

document.addEventListener('click', function(e) {
  if(e.target && e.target.classList.contains('delete')){
    e.target.parentElement.remove();
  }
});

function count() {
  var numOfItems = document.getElementsByClassName('item').length;
  return numOfItems;
}

decreaseButton.addEventListener('click', function() {
  var num = Number(numberField.innerText);
  if (num > 1) {
    numberField.innerText = num - 1;
  }
});

increaseButton.addEventListener('click', function() {
  var num = Number(numberField.innerText);
  if (num < count()) {
    numberField.innerText = num + 1;
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getWinners() {
  var winners = [];
  var num = Number(numberField.innerText);
  var items = [];
  Object.keys(document.getElementsByClassName('item')).forEach(function(item) {
    items.push(document.getElementsByClassName('item')[item].cloneNode(true));
  });
  for (var i = 0; i < num; i++) {
    var randomIndex = getRandomInt(items.length - 1);
    winners.push(items[randomIndex]);
    items.splice(randomIndex, 1);
  }
  return winners;
}

chooseButton.addEventListener('click', function() {
  winnersWrapper.innerHTML = '<p>Победители</p>';
  getWinners().forEach(function(item) {
    var divElem = document.createElement('div');
    divElem.classList.add("item-winner");
    divElem.innerHTML = item.innerText;
    winnersWrapper.append(divElem);
  });
});

cleanButton.addEventListener('click', function() {
  winnersWrapper.innerHTML = '<p>Победители</p>';
  listWrapper.innerHTML = '<p>Участники</p>';
})