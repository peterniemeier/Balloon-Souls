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




  // document.getElementById("youDied").addEventListener("click", function(){
  //   document.getElementById("title").style.display = "inherit";
  //   document.getElementById("welcome").style.display = "inherit";
  //   new Splash();
  //   document.getElementById("youDied").style.display = "none";
  // });



});
