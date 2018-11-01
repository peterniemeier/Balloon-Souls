const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");

  let img = new Image();
  img.src = '../assets/images/bg.png';

  img.onload = function(){
    // create pattern
    var ptrn = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height); // context.fillRect(x, y, width, height);
  }

  const game = new Game();
  new GameView(game, ctx).start();
});
