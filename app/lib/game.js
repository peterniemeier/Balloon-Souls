const Player = require("./player");
const Star = require("./star");
const Util = require("./util");
const Water = require("./water");
const Fish = require("./fish");
const Balloon = require("./balloon");
const Bg = require("./bg");

class Game {
  constructor() {
    this.over = false;
    this.score = 0;
    this.hello = Game.HELLO;
    this.died = Game.DIED;
    this.ost = [Game.OST7];
    // this.ost = [Game.OST1, Game.OST2, Game.OST3, Game.OST4, Game.OST5, Game.OST6, Game.OST7, Game.OST8];
    this.track = null;
    this.width = Game.DIM_X;
    this.height = Game.DIM_Y;
    this.balloonStreak = 0;
    this.balloonIdx = 0
    this.value = 2000;
    this.bg = [];
    this.fish = [];
    this.water = [];
    this.player = [];
    this.stars = [];
    this.balloons = [];
    this.startFiringStars(this);
    this.startFiringBalloons(this);
    // this.addBg();
    this.addWater();
  }

  add(object) {
    if (object instanceof Star) {
      this.stars.push(object);
    } else if (object instanceof Balloon) {
      this.balloons.push(object);
    } else if (object instanceof Fish) {
      this.fish.push(object);
    } else if (object instanceof Player) {
      this.player.push(object);
    } else if (object instanceof Bg) {
      this.bg.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addStatic(object) {
    if (object instanceof Water) {
      this.water.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  startFiringStars(context) {

    setInterval(function(){context.add(new Star({ game: context, pos: [0,600 * Math.random()] }))}, 700);
  }
  startFiringBalloons(context) {

    setInterval(function(){context.add(new Balloon({ game: context, pos: [0,600 * Math.random()] }))}, (Math.random() * (10000 - 5000) + 5000 ));
  }

  addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    }
  }

  addWater() {
    const water = new Water({
      pos: [500,500],
      game: this
    });
    this.addStatic(water);
    return water;
  }

  addBg() {
    const bg = new Bg({
      pos: [0,0],
      game: this
    });
    this.add(bg);
    return bg;
  }

  randomInt(max){
   return Math.floor(Math.random() * Math.floor(max));
   }

  addPlayer() {
    // this.hello.play();
    if ((window.track === undefined) || (window.track.currentTime === 0)) {
    window.track = this.track = this.ost[this.randomInt(this.ost.length)];
      if (window.sound === "AUDIO: ON") {
        window.track.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
        }, false);
          window.track.play();
      }
    }
    const player = new Player({
      pos: this.setPosition(),
      game: this
    });

    this.add(player);

    return player;
  }

  addFish() {
    const fish = new Fish({
      pos: [this.player[0].pos[0],530],
      game: this
    });

    this.add(fish);

    return fish;
  }


  allObjects() {
    // console.log(this.player[0]);
    if (this.fish[0] !== undefined && this.balloons !== undefined) {
    return [].concat(this.bg, this.stars, this.player[0],this.fish[0],this.balloons);
  } else if (this.fish[0] && this.balloons === undefined) {
    return [].concat(this.bg,this.stars, this.player[0],this.fish[0]);
  } else if (this.fish[0] === undefined && this.balloons){
    return [].concat(this.bg,this.stars, this.player[0],this.balloons);
  } else {
    return [].concat(this.bg,this.stars, this.player[0]);
    }
  }

  allStaticObjects() {
    // console.log(this.player[0]);
    return [].concat(this.water);
  }

  checkCollisions() {
    const allObjects = this.allObjects();

    // console.log(allObjects)
      for (let i = 0; i < allObjects.length; i++) {
        for (let j = 0; j < allObjects.length; j++) {
            const obj1 = allObjects[i];
            const obj2 = allObjects[j];
            if (obj1.isCollidedWith(obj2)) {
              const collision = obj1.collideWith(obj2);
              if (collision) return;
            }

        }
      }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      if (object !== undefined) {
      object.draw(ctx);
    // console.log(this.stars);
  }
    });

    this.allStaticObjects().forEach((object) => {
      if (object !== undefined) {
      object.draw(ctx);
    // console.log(this.stars);
    }
    });

  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    document.getElementById("score").innerHTML = "SCORE: " + (this.score += 2);
    const hi = parseInt(document.getElementById("hi-score-val").innerHTML, 10);

    if (this.score > hi){
      document.getElementById("hi-score-val").innerHTML = this.score;
    }
    document.getElementById("streak").innerHTML = "BALLOON STREAK: " + (this.balloonStreak);
    this.player[0].moveMe(delta);
    // console.log(this.player[0].vel);
    this.player[0].decayVel();
    this.allObjects().forEach((object) => {
      if (object !== undefined) {
      object.move(delta);
    }
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  setPosition() {
    return [
    850,
    150
    ];
  }

  remove(object) {
    if (object instanceof Star) {
      this.stars.splice(this.stars.indexOf(object), 1);
    } else if (object instanceof Balloon) {
      this.balloons.splice(this.balloons.indexOf(object), 1);
    } else if (object instanceof Player) {
      this.player.splice(this.player.indexOf(object), 1);
    }  else {
      throw new Error("unknown type of object");
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }


  gameOver(){
    this.over = true;
    this.died.load();
    if (window.sound === "AUDIO: ON") {
    this.died.play();
    }
    document.getElementById("youDied").style.display = "inherit";
    document.getElementById("scoreEnd").innerHTML = "Score: " + this.score;
    const hi = parseInt(document.getElementById("hi-score-val").innerHTML, 10);

    if (this.score > hi){
      document.getElementById("hi-score-val").innerHTML = this.score;
    }
    this.score = 0;
    this.balloonStreak = 0;
    document.getElementById("score").innerHTML = "SCORE: " + (this.score);
    document.getElementById("streak").innerHTML = "BALLOON STREAK: " + (this.balloonStreak);
    // document.getElementById("btnStart").innerHTML = "Click screen to begin anew";
    window.track.pause();
    // this.track.src = this.ost[this.randomInt(this.ost.length)];
    window.track.currentTime = 0;
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

window.died = Game.DIED = new Audio("../assets/temp/thrudeath.wav.mp3");
Game.DIED.volume = 0.50;
// Game.OST1 = new Audio("../assets/temp/Call to Adventure.mp3");
// Game.OST2 = new Audio("../assets/temp/Progear Music - All Ages War -Last Boss Stage-.mp3");
// Game.OST3 = new Audio("../assets/temp/G-Darius - 12 - Kimera II (PS1).mp3");
// Game.OST4 = new Audio("../assets/temp/Earthworm Jim OST - Banjo Race.mp3");
// Game.OST5 = new Audio("../assets/temp/Battletoads (NES) Music - Turbo Tunnel Part 2.mp3");
// Game.OST6 = new Audio("../assets/temp/Ninja Gaiden (NES) Music - Boss Battle.mp3");
Game.OST7 = new Audio("../assets/temp/Duck Tales (NES) Music - Moon Stage.mp3");
// Game.OST8 = new Audio("../assets/temp/Best VGM 303 - Mega Man 3 - Snake Man Stage.mp3");




// Game.OST1.volume = 0.50;
// Game.OST2.volume = 0.50;
// Game.OST3.volume = 0.50;
// Game.OST4.volume = 0.50;
// Game.OST5.volume = 0.50;
// Game.OST6.volume = 0.50;
Game.OST7.volume = 0.50;
// Game.OST8.volume = 0.50;
// Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 10;



module.exports = Game;
