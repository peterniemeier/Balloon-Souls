const MovingObject = require("./moving_object");
const Util = require("./util");
const Player = require("./player");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return '';
}

//',': 188, '.': 190
class Fish extends MovingObject {
  constructor(options) {
    options.radius = Fish.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    let fishImage = new Image();
    fishImage.src = '../assets/images/fish.png'
    super(options);
    this.name = 'billy';
    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 390,
    this.height = 100,
    this.numberOfFrames = 6,
    this.ticksPerFrame = 8,
    this.fishImage = fishImage;
  }

  // fireBullet() {
  //   const norm = Util.norm(this.vel);
  //
  //   if (norm === 0) {
  //     // Can't fire unless moving.
  //     return;
  //   }
  //
  //   const relVel = Util.scale(
  //     Util.dir(this.vel),
  //     Bullet.SPEED
  //   );
  //
  //   const bulletVel = [
  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  //   ];
  //
  //   const bullet = new Bullet({
  //     pos: this.pos,
  //     vel: bulletVel,
  //     color: this.color,
  //     game: this.game
  //   });
  //
  //   this.game.add(bullet);
  // }


  move() {
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
          this.game.fish = [];
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
    // ctx.fill();

    if (this.game.fish[0] !== undefined) {
    ctx.drawImage(
      this.fishImage,
	    this.frameIndex * this.width / this.numberOfFrames,
	    0,
	    this.width / this.numberOfFrames,
	    this.height,
	    this.pos[0] - 33,
	    this.pos[1] - 60,
	    this.width / this.numberOfFrames,
	    this.height);
    return this;
    }

  }
  collideWith(otherObject) {
    if (otherObject instanceof Player) {
      if (this.frameIndex === 3) {
        otherObject.game.gameOver();
        return true;
      }
    }
    //  else if (otherObject instanceof Bullet) {
    //   this.remove();
    //   otherObject.remove();
    //   return true;
    // }

    return false;
  }



}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
Fish.RADIUS = 15;
module.exports = Fish;
