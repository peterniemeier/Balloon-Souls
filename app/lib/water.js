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
    let waterImage = new Image();
    waterImage.src = '../assets/images/water.png'

    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 100,
    this.height = 80,
    this.numberOfFrames = 1,
    this.ticksPerFrame = 5,
    this.waterImage = waterImage;

  }
  update() {

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
    ctx.drawImage(this.waterImage,0,550);

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
