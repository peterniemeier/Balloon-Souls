const Util = require("./util");
const StaticObject = require("./static_object");
const Game = require("./game");
const DEFAULTS = {
  COLOR: "#FFFFFF",
  RADIUS: 20,
  SPEED: 4
};

class Water extends StaticObject {
  constructor(options = {}) {
    // options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
    // let waterImage = new Image();
    // waterImage.src = '../assets/images/water.png'

    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 2080,
    this.height = 80,
    this.numberOfFrames = 2,
    this.ticksPerFrame = 10,
    this.waterImage = window.waterImage;

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

  move(timeDelta) {
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
      this.waterImage,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      this.pos[0] = (0 - 40),
      this.pos[1] = 550,
      this.width / this.numberOfFrames,
      this.height);
    return this;

  }
  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Water;
