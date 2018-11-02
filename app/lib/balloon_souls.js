const Splash = require("./splash");

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


document.addEventListener("DOMContentLoaded", () => {
  new Splash();
  document.getElementById("youDied").addEventListener("click", function(){
    new Splash();
    document.getElementById("youDied").style.display = "none";
  });
});
