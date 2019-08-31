'use strict';
const slider = document.querySelector('.slider');
const vertical = document.querySelector('.slider__vertical-container');
const horizontal = document.querySelector('.slider__horizontal-container');
const sliderVerticalWrapper = document.querySelector('.slider__wrapper');
const vericalSlides = vertical.querySelectorAll('.slide');

const radio = document.querySelector('.switcher-radio');
const radioItem = radio.querySelectorAll('input');

const scale = document.querySelector('.switcher-slider__scale');
const thumb = document.querySelector('.switcher-slider__thumb');

horizontal.style.width = (parseFloat(getComputedStyle(slider).width) * horizontal.children.length) + 'px';

document.ondragstart = function() {
  return false;
};
//Получить координаты элемента
function getCoords(elem) {
  var coords = elem.getBoundingClientRect();
  return {
    left: coords.left + pageXOffset,
    top: coords.top + pageYOffset,
    right: coords.right + pageXOffset,
    bottom: coords.bottom + pageYOffset
  }
}

// Передвинуть горизонтальный слайдер
function moveHorizontalSlides() {
  var currentPos = parseFloat(getComputedStyle(thumb).left);
  var width = scale.offsetWidth;
  var step = slider.offsetWidth;
  var division = width/4;
  return (function() {
    if(currentPos > division) {
      horizontal.style.transform = `translateX(-${ step}px)`;
    }
    if(currentPos > width - division) {
      horizontal.style.transform = `translateX(-${step + step}px)`;
    }
    if(currentPos < division) {
      horizontal.style.transform = `translateX(0px)`;
    }
  })();
}

thumb.onmousedown = function(e) {//handleStart, handleEnd
  var thumbPos = getCoords(thumb);
  var scalePos = getCoords(scale);
  var shiftX = e.pageX - thumbPos.left;
  thumb.style.cursor = 'grabbing';
  document.onmousemove = function(e) {
    var newPos =  e.pageX - scalePos.left - shiftX;
    thumb.style.left = Math.max(0, Math.min(newPos, scale.offsetWidth - thumb.offsetWidth)) + 'px';
    moveHorizontalSlides();
  }
  document.onmouseup = function(e) {
    e.stopPropagation(e);
    document.onmousemove = null;
    thumb.style.cursor = 'grab';
  }
}

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
}
sliderVerticalWrapper.addEventListener('touchmove', function(e){
  e.preventDefault();
  e.stopPropagation();
  diff = start-e.touches[0].pageY;
});
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
});
