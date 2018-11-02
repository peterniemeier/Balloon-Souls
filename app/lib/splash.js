const Game = require("./game");
const GameView = require("./game_view");


class Splash {
  constructor() {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    this.canvasElw = canvasEl.width = Game.DIM_X;
    this.canvasElh = canvasEl.height = Game.DIM_Y;
    const ctx = canvasEl.getContext("2d");
    this.ctx = ctx;
    this.ctx.fillRect(0,0,this.canvasElw,this.canvasElh);
    this.start();
  }

  clickStart() {
    // console.log("I've been invoked");
    return (event) => {
      // console.log('triggered!');
      event.preventDefault();
      this.newGame(event);
    };
  }


  start() {
    // console.log('called?');
    this.callback = this.clickStart();
    document.getElementById("balloon_souls_canvas").addEventListener("click", this.callback);
    document.addEventListener("keydown", this.callback);
  }

  newGame (event) {  // function to start the game when IO is correct
    // check for the correct events
        document.getElementById("score").style.display = "inherit";
        document.getElementById("streak").style.display = "inherit";
        document.getElementById("welcome").style.display = "none";
        document.getElementById("title").style.display = "none";
         // remove events
        document.getElementById("balloon_souls_canvas").removeEventListener("click", this.callback);
        document.removeEventListener("keydown", this.callback);

         let img = new Image();
         img.src = '../assets/images/bg.png';
         img.onload = () => {
           // create pattern
           var ptrn = this.ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
           this.ctx.fillStyle = ptrn;
           this.ctx.fillRect(0, 0, this.canvasElw, this.canvasElh); // context.fillRect(x, y, width, height);
         }
         const game = new Game();
         new GameView(game, this.ctx).start();

  }

}


module.exports = Splash;
