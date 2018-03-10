class Enemy {
  constructor(x = 100, y = 225) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 3.5 + 1.5);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.boxWidth = 80;
    this.boxHeight = 67;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x = this.x + 101 * dt * this.speed;
    if (this.x > 505) {
      this.speed = Math.floor(Math.random() * 3.5 + 1.5);
      this.reset();
    }
    this.collisionsCheck();
  }

  reset() {
    this.x = -111;
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.x, this.y + 75, this.boxWidth, this.boxHeight);
  }

  collisionsCheck() {
    var enemyBox = {
      // Variables applied to each instance
      x: this.x,
      y: this.y,
      // Enemy collision area
      width: this.boxWidth,
      height: this.boxHeight
    };
    var playerBox = {
      // Variables applied to each instance
      x: player.x,
      y: player.y,
      // Enemy collision area
      width: player.boxWidth,
      height: player.boxHeight
    };

    if (
      enemyBox.x < playerBox.x + playerBox.width &&
      enemyBox.x + enemyBox.width > playerBox.x &&
      enemyBox.y < playerBox.y + playerBox.height &&
      enemyBox.height + enemyBox.y > playerBox.y
    ) {
      // Collision detected!
      console.log('Collision is detected.');
      player.collision();
    }
  }

  drawBox(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = '';
    ctx.strokeStyle = '';
    ctx.stroke();
  }
}

class Player {
  constructor(x = 202, y = 420) {
    // Load player image
    this.sprite = 'images/char-horn-girl.png';
    // Starting coordinates
    this.x = x;
    this.y = y;
    this.boxWidth = 65;
    this.boxHeight = 74;
  }

  update(dt) {}

  reset() {
    this.x = 202;
    this.y = 400;
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.x + 16, this.y + 61, this.boxWidth, this.boxHeight);
  }

  handleInput(key) {
    switch (key) {
      case 'up':
        this.y -= 83;
        console.log('this.y', this.y);
        break;
      case 'down':
        this.y += 83;
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

  collision() {
    this.reset();
  }

  drawBox(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = '';
    ctx.strokeStyle = '';
    ctx.stroke();
  }
}

const enemy1 = new Enemy();
const enemy2 = new Enemy(100, 320);
const allEnemies = [enemy1, enemy2];
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
