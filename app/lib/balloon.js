const Util = require("./util");
const MovingObject = require("./moving_object");
const Player = require("./player");

const DEFAULTS = {
  COLOR: "#FFFFFF",
  RADIUS: 20,
  SPEED: 4
};

class Balloon extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || [1,0];
    super(options);
    window.pickup = this.pickup = Balloon.PICKUP;
    window.drink = this.drink = Balloon.DRINK;
    if (this.pos[1] >= 400) {
      this.pos[1] = (600 * Math.random());
    }
    if (this.pos[1] <= 300) {
      this.pos[1] = (600 * Math.random());
    }
    let balloonImage = new Image();
    balloonImage.src = '../assets/images/balloon.png'
    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 80,
    this.value = 2000;
    this.height = 64,
    this.numberOfFrames = 2,
    this.ticksPerFrame = 24,
    this.balloonImage = balloonImage;

  }
  update() {
    // console.log(this.pos);
    this.tickCount += 1;


    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      // If the current frame index is in range
      if (this.frameIndex < this.numberOfFrames - 1) {
          // Go to the next frame
          this.frameIndex += 1;
      } else {
          this.frameIndex = 0;
      }
    }


  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.pos[0] > 1000) {
      //also need logic to reset balloon streak here....
      this.game.balloonStreak = 0;
      this.remove();
    }
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  draw(ctx) {


    this.update();
    // ctx.clearRect(0, 0, this.width, this.height);
    // ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.closePath();
    // ctx.fill();
    // ctx.fillStyle = '#000';


        ctx.drawImage(
          this.balloonImage,
    	    this.frameIndex * this.width / this.numberOfFrames,
    	    0,
    	    this.width / this.numberOfFrames,
    	    this.height,
    	    this.pos[0] - 20,
    	    this.pos[1] - 20,
    	    this.width / this.numberOfFrames,
    	    this.height);
        return this;
  }


  collideWith(otherObject) {
    if (otherObject instanceof Player) {
      this.game.balloonStreak += 1;
      if ((window.sound === "AUDIO: ON") && (this.game.balloonStreak % 10 === 0)) {
        window.drink.play();
      } else if (window.sound === "AUDIO: ON") {
        window.pickup.play();
      }
      // var node = document.createElement("DIV");
      // var textnode = document.createTextNode(" ");
      // node.appendChild(textnode);
      // document.getElementById("streak").appendChild(node);
      this.remove()
      document.getElementById("score").innerHTML = "SCORE: " + (this.game.score += this.value);
      return true;
    }
    //  else if (otherObject instanceof Bullet) {
    //   this.remove();
    //   otherObject.remove();
    //   return true;
    // }
  }
}

Balloon.PICKUP = new Audio("../assets/temp/ITEMGET.wav.mp3");
Balloon.PICKUP.volume = 0.50;
Balloon.DRINK = new Audio("../assets/temp/EST-drink.wav.mp3");
Balloon.DRINK.volume = 0.50;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Balloon;
