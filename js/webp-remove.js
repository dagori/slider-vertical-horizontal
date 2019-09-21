'use strict';
(function() {
  const user = window.navigator.userAgent;
  if(user.indexOf('Mac OS') !== -1 && user.indexOf('Safari') !== -1) {
    const wepb = document.querySelectorAll('.webp');
    for(let i = 0; i < webp.length; i++) {
      webp[i].classList.add('no-webp');
    }
  }
})();
