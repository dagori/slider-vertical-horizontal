'use strict';

window.slider = document.querySelector('.slider');

const vertical = document.querySelector('.slider__vertical-container');
const sliderVerticalWrapper = document.querySelector('.slider__wrapper');
const vericalSlides = vertical.querySelectorAll('.slide');

const radio = document.querySelector('.switcher-radio');
const radioItem = radio.querySelectorAll('input');

//Передвинуть вертикальный слайдер
var indexFrom = 0;
var diff;
var start;
var position;

radio.addEventListener('change', ({target}) => {
  var nextRadioIndex = Array.from(radioItem).indexOf(target);
  moveVerticalSlides(nextRadioIndex);
});

function moveVerticalSlides(indexTo) {
  if(!indexFrom) {
    vericalSlides[0].classList.remove('next');
    vericalSlides[1].style.backgroundPosition = 'center 20%, center';
  }
  if(indexFrom === 2) {
    vericalSlides[1].style.backgroundPosition = 'center 50%, center';
  }
  if(!indexTo) {
    vericalSlides[0].classList.add('next');
  }
  position = vericalSlides[indexFrom].offsetHeight * indexTo;
  vertical.style.transform = `translateY(${-position}px)`;

  var text = 'было: ' + indexFrom + ', видим: ' + indexTo;
  document.querySelector('button').textContent = document.querySelector('button').textContent + "  " + text;
  indexFrom = indexTo;
};

sliderVerticalWrapper.addEventListener('mousedown', (e) => {
  start = e.pageY;
  sliderVerticalWrapper.addEventListener('mouseup', (e) => {
    e.stopImmediatePropagation();
    diff = start - e.pageY;
    if(Math.abs(diff) < 100) return;
    if(diff < 0 && indexFrom !== 0) {
      radioItem[indexFrom - 1].checked = true;
      moveVerticalSlides(indexFrom - 1);
    }
    if(diff > 0 && indexFrom !== vericalSlides.length - 1) {
      radioItem[indexFrom + 1].checked = true;
      moveVerticalSlides(indexFrom + 1);
    }
    sliderVerticalWrapper.mouseup = null;
  });
});

sliderVerticalWrapper.addEventListener('touchstart', function(e){
  e.preventDefault();
  e.stopPropagation();
  start = e.touches[0].pageY;
}, true);
sliderVerticalWrapper.addEventListener('touchmove', function(e){
  e.preventDefault();
  e.stopPropagation();
  diff = start-e.touches[0].pageY;
}, true);
sliderVerticalWrapper.addEventListener('touchend', function(e){
  e.preventDefault();
  e.stopPropagation();
  if(Math.abs(diff) < 100) return;
  alert(diff);
  if(diff < 0 && indexFrom !== 0) {
    radioItem[indexFrom - 1].checked = true;
    moveVerticalSlides(indexFrom - 1);
  }
  if(diff > 0 && indexFrom !== vericalSlides.length - 1) {
    radioItem[indexFrom + 1].checked = true;
    moveVerticalSlides(indexFrom + 1);
  }
}, true);
