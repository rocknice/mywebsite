!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="/",n(n.s=11)}([,,,,,,,,,,,function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();t(12),t(13),t(14),{init:function(){var e=!0;!function(){var n=document.getElementsByClassName("container"),t=document.getElementById("angle");window.addEventListener("deviceorientation",function(o){var r=o.gamma,i=Math.floor(r);t.innerHTML="Gama角为: "+i+"°",Math.abs(i)>10?(e=!1,n[0].style.transform="rotateY("+3*i+"deg)"):e=!0},!1)}();var n=function(){function n(e){o(this,n),this.elem=document.getElementById(e)}return r(n,[{key:"mouseDrag",value:function(){var n=this.elem,t=n.children,o=void 0,r=void 0,i=void 0,u=0;n.onmousedown=function(a){return a.preventDefault(),o=window.event||a,r=o.screenX+u,n.onmousemove=function(n){e&&(i=n.screenX,u=r-i,t[0].style.transform="rotateY("+u/2+"deg)")},n.onmouseleave=function(e){n.onmousemove=null,n.onmouseup=null},n.onmouseup=function(e){n.onmousemove=null,n.onmouseup=null},!1}}},{key:"touchDrag",value:function(){var n=this.elem,t=n.children,o=void 0,r=void 0,i=void 0,u=0;n.addEventListener("touchstart",function(e){e.preventDefault(),o=window.event||e,r=o.touches[0].screenX+u},!1),n.addEventListener("touchmove",function(n){e&&(n.preventDefault(),i=n.touches[0].screenX,u=r-i,t[0].style.transform="rotateY("+u+"deg)")})}},{key:"playAudio",value:function(){var e=document.getElementsByClassName("iconfont"),n=document.getElementById("audio");e[0].addEventListener("click",function(t){t.className;n.paused?(n.play(),e[0].className="iconfont icon-zanting"):(n.pause(),e[0].className="iconfont icon-play")},!1)}},{key:"browserUA",value:function(){var e=this.elem,n=window.navigator.userAgent;!0==(-1!=n.indexOf("Safari")&&-1!=n.indexOf("Version")&&-1==n.indexOf("Mobile"))&&(e.style.perspective="40rem",e.style.perspectiveOrigin="100% 2%")}}]),n}(),t=new n("box");t.mouseDrag(),t.touchDrag(),t.playAudio(),t.browserUA()}}.init()},function(e,n){},function(e,n){},function(e,n){}]);