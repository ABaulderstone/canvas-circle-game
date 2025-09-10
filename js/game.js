import { Circle } from './circle.js';
import { randomInt } from './utils.js';

export class Game {
  #canvas;
  #circles = [];
  #score = 0;
  #isActive = false;
  #timeLeft = 15;
  #ctx;
  #tickInterval;
  #spawnInterval;

  constructor(canvas, ctx) {
    this.#canvas = canvas;
    this.#ctx = ctx;
    this.#canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const circle of this.#circles) {
        if (circle.isClicked(mouseX, mouseY)) {
          this.#incrementScore(circle.onClick());
          break;
        }
      }
    });
  }

  #incrementScore(amount) {
    this.#score += amount;
  }

  #spawn = () => {
    let x;
    let y;
    let valid = false;
    let attempts = 0;
    while (!valid && attempts < 30) {
      attempts++;

      x = randomInt(40, this.#canvas.width - 40);
      y = randomInt(40, this.#canvas.height - 40);
      const newCircle = new Circle(x, y, 'blue');
      valid = this.#circles.every((c) => !Circle.doesOverlap(c, newCircle));
      if (valid) {
        this.#circles.push(newCircle);
      }
    }
  };
  #endGame() {
    this.#isActive = false;
    this.#circles = [];
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    clearInterval(this.#tickInterval);
    clearInterval(this.#spawnInterval);
  }
  #tick = () => {
    if (!this.#isActive) return;
    this.#timeLeft--;
    if (this.#timeLeft <= 0) {
      this.#endGame();
    }
  };

  #gameLoop = () => {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    if (this.#isActive) {
      this.#circles.forEach((c) => c.update());
      this.#circles = Circle.filter(this.#circles);
      this.#circles.forEach((c) => c.draw(this.#ctx));
    }

    this.#isActive && requestAnimationFrame(this.#gameLoop);
  };
  get isActive() {
    return this.#isActive;
  }
  get score() {
    return this.#score;
  }

  get timeLeft() {
    return this.#timeLeft;
  }
  start() {
    this.#isActive = true;
    this.#spawnInterval = setInterval(this.#spawn, 400);
    this.#tickInterval = setInterval(this.#tick, 1000);
    this.#gameLoop();
  }
}
