class Enemy {
  constructor(x = 100, y = 225) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 4 + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x = this.x + 101 * dt * this.speed;
    if (this.x > 505) {
      this.speed = Math.floor(Math.random() * 4 + 1);
      this.reset();
    }
  }

  reset() {
    this.x = -111;
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor() {
    // Load player image
    this.sprite = 'images/char-boy.png';
    // Starting coordinates
    this.x = 202;
    this.y = 400;
  }

  update(dt) {
    this.x = this.x;
  }

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

const enemy1 = new Enemy();
const allEnemies = [enemy1];
const player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
