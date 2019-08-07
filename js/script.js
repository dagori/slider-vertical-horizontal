'use strict';
const slider = document.querySelector('.slider');
const vertical = document.querySelector('.vertical-container');
const horizontal = document.querySelector('.horizontal-container');
const radio = document.querySelector('.switcher-radio');
const radioItem = radio.querySelectorAll('input');
const scale = document.querySelector('.switcher-slider__scale');
const thumb = document.querySelector('.switcher-slider__thumb');
var currentIndex = 0;
horizontal.style.width = (parseFloat(getComputedStyle(slider).width) * horizontal.children.length) + 'px';

document.ondragstart = function() {
  return false;
};

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

thumb.onmousedown = function(e) {
  var thumbPos = getCoords(thumb);
  var scalePos = getCoords(scale);
  var shiftX = e.pageX - thumbPos.left;
  thumb.style.cursor = 'grabbing';
  document.onmousemove = function(e) {
    var newPos =  e.pageX - scalePos.left - shiftX;
    thumb.style.left = Math.max(0, Math.min(newPos, scale.offsetWidth - thumb.offsetWidth)) + 'px';
    moveHorizontalSlides();
  }
  document.onmouseup = function() {
    document.onmousemove = null;
    thumb.onmouseup = null;
    thumb.style.cursor = 'grab';
  }
}

//Передвинуть вертикальный слайдер
radio.addEventListener('change', (e) => {
  var nextRadioIndex = Array.from(radioItem).indexOf(e.target);
  moveVerticalSlides(nextRadioIndex);
});

function moveVerticalSlides(newIndex) {
  if(!currentIndex) {
    vertical.children[0].classList.remove('next');
    vertical.children[1].style.backgroundPosition = 'center 20%, center';
  }
  var position = vertical.children[currentIndex].offsetHeight * newIndex;
  vertical.style.transform = `translateY(${-position}px)`;
  console.log(currentIndex, newIndex);
  if(currentIndex === 2) {
    vertical.children[1].style.backgroundPosition = 'center 50%, center';
  }
  currentIndex = newIndex;
  if(!newIndex) {
    vertical.children[0].classList.add('next');
  }
};

vertical.addEventListener('mousedown', (e) => {
  var slide = e.target.closest('.slide');
  if(!slide || e.target.closest('.switcher-slider') || e.target.closest('.switcher-radio')) return;
  var slideIndex = Array.from(vertical.children).indexOf(slide);
  var diff;
  var start = e.pageY;
  vertical.addEventListener('mousemove', (e) => {
    diff = start - e.pageY;
    if(Math.abs(diff) < 100) return;
  });
  vertical.addEventListener('mouseup', () => {
    if(!slide || e.target.closest('.switcher-slider') || e.target.closest('.switcher-radio')) return;
    if(diff < 0 && slideIndex !== 0) {
      moveVerticalSlides(slideIndex - 1);
      radioItem[slideIndex - 1].checked = true;
    }
    if(diff > 0 && slideIndex !== vertical.children.length - 1) {
      moveVerticalSlides(slideIndex + 1);
      radioItem[slideIndex + 1].checked = true;
    }
    vertical.onmousemove = null;
    vertical.mouseup = null;
  });
});

vertical.addEventListener('touchstart', (e) => {
  e.stopPropagation();
  var slide = e.target.closest('.slide');
  if(!slide || e.target.closest('.switcher-slider') || e.target.closest('.switcher-radio')) return;
  var slideIndex = Array.from(vertical.children).indexOf(slide);
  var diff;
  var start = e.pageY;
  vertical.addEventListener('touchmove', (e) => {
    e.stopPropagation();
    diff = start - e.pageY;
    if(Math.abs(diff) < 100) return;
  });
  vertical.addEventListener('touchend', () => {
    e.stopPropagation();
    if(!slide || e.target.closest('.switcher-slider') || e.target.closest('.switcher-radio')) return;
    if(diff < 0 && slideIndex !== 0) {
      moveVerticalSlides(slideIndex - 1);
      radioItem[slideIndex - 1].checked = true;
    }
    if(diff > 0 && slideIndex !== vertical.children.length - 1) {
      moveVerticalSlides(slideIndex + 1);
      radioItem[slideIndex + 1].checked = true;
    }
    vertical.ontouchmove = null;
    vertical.ontouchend = null;
  });
});
