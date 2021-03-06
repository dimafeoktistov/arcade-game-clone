//class for creating Enemy object
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
  }

  collisionsCheck() {
    const enemyBox = {
      // Variables applied to each instance
      x: this.x,
      y: this.y,
      // Enemy collision area
      width: this.boxWidth,
      height: this.boxHeight
    };
    const playerBox = {
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
      player.lives--;
      player.defaultPosition();
    }
  }

  // helper functions to see hit boxes
  // drawBox(x, y, width, height) {
  //   ctx.beginPath();
  //   ctx.rect(x, y, width, height);
  //   ctx.lineWidth = '';
  //   ctx.strokeStyle = '';
  //   ctx.stroke();
  // }
}

//class for creating Player objects
class Player {
  constructor(x = 202, y = 400) {
    // Load player image
    this.sprite = 'images/char-horn-girl.png';
    // Starting coordinates
    this.x = x;
    this.y = y;
    this.boxWidth = 65;
    this.boxHeight = 50;
    this.lives = 5;
    this.gems = 0;
  }

  update() {}

  defaultPosition() {
    this.x = 202;
    this.y = 400;
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'up':
        if (this.y != 68) {
          this.y -= 83;
          break;
        } else {
          this.defaultPosition();
          this.lives--;
          break;
        }
      case 'down':
        if (this.y != 400) {
          this.y += 83;
          break;
        }
        break;
      case 'left':
        if (this.x != 0) {
          this.x -= 101;
          break;
        }
        break;
      case 'right':
        if (this.x != 404) {
          this.x += 101;
          break;
        }
        break;
      case 'restart':
        game.resetGame();
        break;
    }
  }
}

//class for creating Game objects
class Game {
  constructor() {
    this.started = true;
  }

  update() {
    lives.innerHTML = `You lives: ${player.lives}`;
    gemsCount.innerHTML = `Gems collected: ${player.gems}`;
    this.gameOver();
    this.gameWon();
  }

  gameOver() {
    if (player.lives === 0) {
      this.started = false;
      openModal();
      message.innerHTML = 'You Lost :(';
    }
  }
  gameWon() {
    if (player.gems === 3) {
      this.started = false;
      openModal();
      message.innerHTML = 'You Won!!!';
    }
  }

  handleInput(key) {
    switch (key) {
      case 'pause':
        if (this.started) {
          this.started = false;
          break;
        } else {
          this.started = true;
          break;
        }
    }
  }

  resetGame() {
    player.defaultPosition();
    allGems.forEach(function(gem) {
      gem.reset();
    });
    player.gems = 0;
    player.lives = 5;
    game.started = true;
    closeModal();
  }

  stopGame() {
    player.defaultPosition();
    allGems.forEach(function(gem) {
      gem.reset();
    });
    player.gems = 0;
    player.lives = 5;
    closeModal();
  }
}

// class for creating gem objects
class Gem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.boxWidth = 50;
    this.boxHeight = 50;
    this.sprite = 'images/Gem-Green.png';
  }

  update(dt) {
    this.collisionsCheck();
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    this.x = getRandomCoordinates(0, 404);
    this.y = getRandomCoordinates(0, 250);
  }
  collisionsCheck() {
    const gemBox = {
      // Variables applied to each instance
      x: this.x,
      y: this.y,
      // Gem collision area
      width: this.boxWidth,
      height: this.boxHeight
    };
    const playerBox = {
      // Variables applied to each instance
      x: player.x,
      y: player.y,
      // Player collision area
      width: player.boxWidth,
      height: player.boxHeight
    };

    if (
      gemBox.x < playerBox.x + playerBox.width &&
      gemBox.x + gemBox.width > playerBox.x &&
      gemBox.y < playerBox.y + playerBox.height &&
      gemBox.height + gemBox.y > playerBox.y
    ) {
      // Collision detected!
      player.gems++;
      this.x = -100;
      this.y = -100;
    }
  }
}

//Instishiating classes
const game = new Game();
const enemy1 = new Enemy();
const enemy2 = new Enemy(100, 135);
const enemy3 = new Enemy(100, 65);
const allGems = [];
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player();

//Adding query selectors to manipulate dom
const modal = document.querySelector('.js-modal');
const replay = document.querySelector('.replay');
const restart = document.querySelector('.restart');
const lives = document.querySelector('.live');
const gemsCount = document.querySelector('.gems');
const message = document.querySelector('.message');
const ok = document.querySelector('.ok');

//function for getting gems with random coordinates
function getGems() {
  for (var i = 0; i < 3; i++) {
    gem = new Gem(getRandomCoordinates(0, 404), getRandomCoordinates(0, 250));
    allGems.push(gem);
  }
}

function openModal() {
  modal.classList.add('js-modal--opened');
  modal.classList.remove('js-modal');
}

function closeModal() {
  modal.classList.add('js-modal');
  modal.classList.remove('js-modal--opened');
}

function getRandomCoordinates(min, max) {
  return Math.random() * (max - min) + min;
}

getGems();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  e.preventDefault;
  if (game.started) {
    const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      82: 'restart'
    };
    player.handleInput(allowedKeys[e.keyCode]);
  } else {
    const allowedKeys = {
      32: 'pause'
    };
    game.handleInput(allowedKeys[e.keyCode]);
  }
});

//This listens for events which resets the game
replay.addEventListener('click', game.resetGame);
restart.addEventListener('click', game.resetGame);
ok.addEventListener('click', game.stopGame);
//prevents default keys action
window.addEventListener(
  'keydown',
  function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);
