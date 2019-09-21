'use strict';
(function() {
  const user = window.navigator.userAgent;
  var webp = document.querySelectorAll('.webp');
  if(user.indexOf('Mac OS') !== -1 && user.indexOf('Safari') !== -1) {
    for(let i = 0; i < webp.length; i++) {
      webp[i].classList.add('no-webp');
    }
  }
})();
