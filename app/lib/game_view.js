const Game = require("./game");




class GameView {
  constructor(game, ctx) {
    console.log(game);
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
      if (window.animation){
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
