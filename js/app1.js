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
  constructor(x = 202, y = 400) {
    // Load player image
    this.sprite = 'images/char-boy.png';
    // Starting coordinates
    this.x = x;
    this.y = y;
  }

  update(dt) {
    this.x = this.x;
  }

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'up':
        this.y -= 85;
        console.log('this.y', this.y);
        break;
      case 'down':
        this.y += 85;
        console.log('this.y', this.y);
        break;
      case 'left':
        this.x -= 101;
        console.log('this.x', this.x);
        break;
      case 'right':
        this.x += 101;
        console.log('this.x', this.x);
        break;
    }
  }
}

const enemy1 = new Enemy();
const allEnemies = [enemy1];
const player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  e.preventDefault;
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
