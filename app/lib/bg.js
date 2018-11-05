const Util = require("./util");
const MovingObject = require("./moving_object");
const Game = require("./game");
const DEFAULTS = {
  COLOR: "#FFFFFF",
  RADIUS: 20,
  SPEED: 4
};

class Bg extends MovingObject {
  constructor(options = {}) {
    // options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = [5,0];
    super(options);
    let bgImage = new Image();
    bgImage.src = '../assets/images/bg2.gif'
    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 570,
    this.height = 363,
    this.numberOfFrames = 1,
    this.ticksPerFrame = 10,
    this.bgImage = bgImage;

  }

    collideWith(otherObject) {
      // default do nothing
    }

    draw(ctx) {
      // ctx.fillStyle = this.color;
      // this.update();
      // ctx.beginPath();
      // ctx.arc(
      //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      // );
      // ctx.fill();
      this.update();
      // ctx.drawImage(this.waterImage,0,550);
      ctx.drawImage(
        this.bgImage,
        this.frameIndex * this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        this.pos[0],
        this.pos[1],
        this.width / this.numberOfFrames,
        this.height);
      return this;

    }

    update() {

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

    isCollidedWith(otherObject) {
      const centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < (this.radius + otherObject.radius);
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

      // if (this.pos[0] > 1000) {
      //
      //   this.remove();
      // }
      // if (this.game.isOutOfBounds(this.pos)) {
      //   if (this.isWrappable) {
      //     this.pos = this.game.wrap(this.pos);
      //   } else {
      //     this.remove();
      //   }
      // }
    }

    remove() {
      this.game.remove(this);
    }
  }

  const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

  module.exports = Bg;
