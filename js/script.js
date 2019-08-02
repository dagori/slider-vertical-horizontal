'use strict';
const slider = document.querySelector('.slider');
const vertical = document.querySelector('.vertical-container');
const horizontal = document.querySelector('.horizontal-container');
const radio = document.querySelector('.switcher-radio');
const radioItem = radio.querySelectorAll('input');
const scale = document.querySelector('.switcher-slider__scale');
const thumb = document.querySelector('.switcher-slider__thumb');
horizontal.style.width = (parseFloat(getComputedStyle(slider).width) * horizontal.children.length) + 'px';

function getCoords(elem) {
  var coords = elem.getBoundingClientRect();
  return {
    left: coords.left + pageXOffset,
    top: coords.top + pageYOffset,
    right: coords.right + pageXOffset,
    bottom: coords.bottom + pageYOffset
  }
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
  document.ondragstart = function() {
    return false;
  };
}

function moveHorizontalSlides() {
  var currentPos = parseFloat(getComputedStyle(thumb).left);
  var width = scale.offsetWidth;
  var step = slider.offsetWidth;
  return (function() {
    if(currentPos > width/4) {
      horizontal.style.transform = `translateX(-${ step}px)`;
    }
    if(currentPos > width - width/4) {
      horizontal.style.transform = `translateX(-${step + step}px)`;
    }
    if(currentPos < width/4) {
      horizontal.style.transform = `translateX(0px)`;
    }
  })();
}

radio.addEventListener('change', ({target}) => {
  if(target.tagName !== 'INPUT')  return;
  radioItem.indexOf = [].indexOf;
  var index = radioItem.indexOf(target);
  var position = vertical.children[index].offsetHeight * index;
  vertical.style.transform = `translateY(${-position}px)`;
});
