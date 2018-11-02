const Game = require("./game");

const requestAnimationFrame = window.requestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;

let myReq;

class GameView {
  constructor(game, ctx, Splash) {
    this.ctx = ctx;
    window.splash = Splash;

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
          myReq = requestAnimationFrame(this.animate.bind(this));
          cancelAnimationFrame(myReq);
          document.getElementById("score").style.color = "black";
          document.getElementById("streak").style.color = "black";
          document.getElementById("hi-score").style.color = "black";
          document.getElementById("hi-score-val").style.color = "black";
          setTimeout((function() {
            document.getElementById("getGoing").innerHTML = "Press any key";
            // var elem = document.getElementById("balloon_souls_canvas");
            // elem.parentNode.removeChild(elem);
            // var canv = document.createElement('canvas');
            // canv.id = 'balloon_souls_canvas';
            // document.getElementById("content").appendChild(canv);
            // document.getElementById("title").style.display = "inherit";
            // document.getElementById("welcome").style.display = "inherit";


            // document.getElementById("youDied").addEventListener("click", function(){
            //   new Splash();
            //   document.getElementById("youDied").style.display = "none";
            // });
            const thing = function(){

            if (document.getElementById("youDied").style.display === "inherit") {
              window.removeEventListener("keydown", thing);
              document.getElementById("title").style.display = "inherit";
              document.getElementById("welcome").style.display = "inherit";
              document.getElementById("youDied").style.display = "none";
              new this.splash();
            }
          }
            window.addEventListener("keydown", thing);
        }).bind(this), 3000);
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
