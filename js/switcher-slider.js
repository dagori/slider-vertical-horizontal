const horizontal = document.querySelector('.slider__horizontal-container');
const scale = document.querySelector('.switcher-slider__scale');
const thumb = document.querySelector('.switcher-slider__thumb');
horizontal.style.width = (parseFloat(getComputedStyle(window.slider).width) * horizontal.children.length) + 'px';

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
  var step = window.slider.offsetWidth;
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
  document.addEventListener('mouseup', mouseupHandler, true);
}

function mouseupHandler(e) {
  e.stopPropagation(e);
  thumb.style.cursor = 'grab';
  document.onmousemove = null;
  document.removeEventListener('mouseup', mouseupHandler, true);
}

function touchendHandler(e) {
  e.stopPropagation(e);
  document.touchmove = null;
  document.removeEventListener('touchup', touchendHandler, true);
}

thumb.addEventListener('touchstart', function(e) {
  var thumbPos = getCoords(thumb);
  var scalePos = getCoords(scale);
  var shiftX = e.touches[0].pageX - thumbPos.left;
  document.addEventListener('touchmove', function(e) {
    var newPos =  e.touches[0].pageX - scalePos.left - shiftX;
    thumb.style.left = Math.max(0, Math.min(newPos, scale.offsetWidth - thumb.offsetWidth)) + 'px';
    moveHorizontalSlides();
  });
  document.addEventListener('touchend', touchendHandler, true);
});
