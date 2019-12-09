/*global Phaser*/

const config = {
  type: Phaser.CANVAS,
  width: 2003,
  height: 1123,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  }
  };

window.onload = function(){
    resize();
    window.addEventListener("resize",resize,false);
  }

function resize(){
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio =  2003/ 1123;
  if(windowRatio > gameRatio){
      canvas.style.width = windowWidth + "px";
      canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
      canvas.style.width = (windowHeight * gameRatio) + "px";
      canvas.style.height = windowHeight + "px";
    }
  }
//pixelArt: true
export {config as default};
