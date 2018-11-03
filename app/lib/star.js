const Util = require("./util");
const MovingObject = require("./moving_object");
const Player = require("./player");

const DEFAULTS = {
  COLOR: "#FFFFFF",
  RADIUS: 13,
  SPEED: 4
};

class Star extends MovingObject {
  constructor(options = {}) {
    options.color = options.color || DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec((3 * Math.random()) + 1);
    super(options);
    let starImage = new Image();
    starImage.src = '../assets/images/stars.png'
    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 100,
    this.height = 20,
    this.numberOfFrames = 5,
    this.ticksPerFrame = 3,
    this.starImage = starImage;

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
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.pos[0] >= 1000) {
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
          this.starImage,
    	    this.frameIndex * this.width / this.numberOfFrames,
    	    0,
    	    this.width / this.numberOfFrames,
    	    this.height,
    	    this.pos[0] - 9,
    	    this.pos[1] - 9,
    	    this.width / this.numberOfFrames,
    	    this.height);
        return this;
  }


  collideWith(otherObject) {
    if (otherObject instanceof Player) {
      otherObject.game.gameOver();
      return true;
    }
    return false;
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Star;
