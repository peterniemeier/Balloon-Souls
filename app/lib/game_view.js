const Game = require("./game");
const Splash = require("./splash");
const requestAnimationFrame = window.requestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;
let myReq;

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;

    this.player = this.game.addPlayer();
    // this.initializeBg();
    this.bg = new Image();
    this.bg.width = 40;
    this.bg.height = 40;

    this.bg.src = '../assets/images/bg.png';


  }

  bindKeyHandlers() {
    const player = this.player;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { player.power(move); });
    });

    key(",", () => { player.flap(); });

  }

  start() {
      this.bindKeyHandlers();
      this.lastTime = 0;
      // start the animation

      window.animation = requestAnimationFrame(this.animate.bind(this));
  }

    animate(time) {
        if (this.game.over === true) {
          // window.cancelAnimationFrame(this.animate.bind(this));
          myReq = requestAnimationFrame(this.animate);

          cancelAnimationFrame(myReq);

          setTimeout(() => {
            {this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height); this.ctx=null; return;}
            let oldcanv = document.getElementById('balloon_souls_canvas');
            document.removeChild(oldcanv);

            var canv = document.createElement('canvas');
            canv.id = 'balloon_souls_canvas';
            document.body.appendChild(canv);
          }, 5000);

          this.game.over = false;
        } else {
        const timeDelta = time - this.lastTime;

        this.game.step(timeDelta);
        this.game.draw(this.ctx);
        this.lastTime = time;
        // every call to animate requests causes another call to animate
        window.animation = requestAnimationFrame(this.animate.bind(this));
      }
    }
}

GameView.MOVES = {
  // w: [0, -1],
  a: [-1, 0],
  // s: [0, 1],
  d: [1, 0],
  // ',': [0, -1],
  // .: 190
};

module.exports = GameView;
