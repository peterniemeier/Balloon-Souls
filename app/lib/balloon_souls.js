const Splash = require("./splash");
// function Splash() {};
// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementsByTagName("canvas")[0];
//   document.getElementById("youDied").addEventListener("click", function(){
//     document.getElementById("youDied").style.display = "none";
//   });
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//
//   const ctx = canvasEl.getContext("2d");
//
//   const game = new Game();
//   new Splash(game, ctx);
//
// //save this for later when gave over needs to display you died.
//   // document.getElementById("youDied").addEventListener("click", function(){
//   //   document.getElementById("youDied").style.display = "inherit";
//   // });
// });
// function clickStart() {
//   // console.log("I've been invoked");
//     // console.log('triggered!');
//     document.getElementById("title").style.display = "inherit";
//     document.getElementById("welcome").style.display = "inherit";
//     new Splash();
//     document.getElementById("youDied").style.display = "none";
// }

document.addEventListener("DOMContentLoaded", () => {
  new Splash();
  window.sound = "AUDIO: ON";


  document.getElementById("audio-control").addEventListener("click", function(){
    let audioState = document.getElementById("audio-toggle").innerHTML;
    if (audioState === "AUDIO: ON") {
      window.sound = document.getElementById("audio-toggle").innerHTML = "AUDIO: OFF";
      if (window.track !== undefined) {
        window.died.pause();
        window.died.currentTime = 0;
        window.track.pause();
        window.track.currentTime = 0;
      }
    } else {
      window.sound = document.getElementById("audio-toggle").innerHTML = "AUDIO: ON";
      if (window.track !== undefined) {
        if (window.sound === "AUDIO: ON") {
          window.track.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
          }, false);
            window.track.play();
        }
      }
    }
    // document.getElementById("audio-toggle").style.display = "inherit";
    // document.getElementById("welcome").style.display = "inherit";
    // new Splash();
    // document.getElementById("youDied").style.display = "none";
  });



});
