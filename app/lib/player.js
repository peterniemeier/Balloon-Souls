const MovingObject = require("./moving_object");
const Util = require("./util");


function randomColor() {
  const hexDigits = "0123456789ABCDEF";
  // Legacy code to test hitbox of player
  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return '';
}

class Player extends MovingObject {
  constructor(options) {
    options.radius = Player.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    let playerImage = new Image();
    playerImage.src = '../assets/images/player-left.png'
    super(options);
    this.isWrappable = false;
    this.frameIndex = 0,
    this.tickCount = 0,
    this.width = 193,
    this.height = 100,
    this.numberOfFrames = 3,
    this.ticksPerFrame = 4,
    this.playerImage = playerImage;
    this.flapping = false;
    this.flapCount = 0;
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }
  move() {
    // we use moveMe instead
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
    this.flapCount += 1;
    if(this.flapCount > 45 && this.flapping == true && (this.vel[0] < 0 || this.vel[0] == 0)) {
      this.flapCount = 0
      this.flapping = false;
      this.playerImage.src="../assets/images/player-left.png"
    } else if (this.flapCount > 45 && this.flapping == true && this.vel[0] > 0){
      this.flapCount = 0
      this.flapping = false;
      this.playerImage.src="../assets/images/player-right.png"
    }


    ctx.drawImage(
      this.playerImage,
	    this.frameIndex * this.width / this.numberOfFrames,
	    0,
	    this.width / this.numberOfFrames,
	    this.height,
	    this.pos[0] - 33,
	    this.pos[1] - 50,
	    this.width / this.numberOfFrames,
	    this.height);
    return this;
  }

  moveMe(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;
    if (this.pos[1] < 20) {
      this.pos[1] = 20;
    }
    if (this.pos[0] < 10) {
      this.vel[0] = 2;
      this.pos[0] = 10;
    }
    if (this.pos[0] > 990) {
      this.vel[0] = -2;
      this.pos[0] = 990;
    }
    if (this.pos[1] > 590) {
      this.pos[1] = 590;
      this.game.gameOver();
    }
    this.pos = [this.pos[0] + offsetX, this.pos[1] + 3 + offsetY];
    if(this.vel[0] < 0 && this.flapping == false) {
      this.playerImage.src="../assets/images/player-left.png"
    } else if (this.vel[0] > 0 && this.flapping == false){
      this.playerImage.src="../assets/images/player-right.png"
    }
    // Commented this shit out because it was causing the game to crash once the player got out of bounds.
    // if (this.game.isOutOfBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     this.pos = this.game.wrap(this.pos);
    //   } else {
    //     this.remove();
    //   }
    // }

    if (this.pos[1] > 500 && this.game.fish[0] === undefined) {
      this.game.addFish();
    }
  }
  flap() {
    this.vel[1] -= 10;
    this.flapping = true;
    if(this.vel[0] < 0) {
      this.playerImage.src="../assets/images/player-left-flap.png"
    } else if (this.vel[0] > 0) {
      this.playerImage.src="../assets/images/player-right-flap.png"
    } else if (this.vel[0] == 0) {
      this.playerImage.src="../assets/images/player-left-flap.png"
    }
  }

  decayVel() {
    if (this.vel[0] > 5) {
      this.vel[0] -= 1;
    }
    if (this.vel[0] < -5) {
      this.vel[0] += 1;
    }
    if (this.vel[1] < 0) {
      this.vel[1] += 1;
    }
    if (this.vel[1] < -10) {
      this.vel[1] += 10;
    }
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
Player.RADIUS = 21;
module.exports = Player;