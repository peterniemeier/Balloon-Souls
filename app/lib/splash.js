const Game = require("./game");
const GameView = require("./game_view");


class Splash {
  constructor(game, ctx) {

    this.ctx = ctx;
    this.game = game;
    this.ctx.fillRect(0,0,this.game.width,this.game.height);
    this.start();
  }


  start() {
    document.getElementById("balloon_souls_canvas").addEventListener("click", this.newGame.bind(this));
    document.getElementById("balloon_souls_canvas").addEventListener("keypress", this.newGame.bind(this));

  }

  newGame (event) {  // function to start the game when IO is correct
    // check for the correct events
        document.getElementById("score").style.display = "inherit";
        document.getElementById("welcome").style.display = "none";
         // remove events
        document.getElementById("balloon_souls_canvas").removeEventListener("click", this.newGame.bind(this));
        document.getElementById("balloon_souls_canvas").removeEventListener("keypress", this.newGame.bind(this));

         let img = new Image();
         img.src = '../assets/images/bg.png';
         img.onload = () => {
           // create pattern
           var ptrn = this.ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
           this.ctx.fillStyle = ptrn;
           this.ctx.fillRect(0, 0, this.game.width, this.game.height); // context.fillRect(x, y, width, height);
         }
         new GameView(this.game, this.ctx).start();

  }

}


module.exports = Splash;
