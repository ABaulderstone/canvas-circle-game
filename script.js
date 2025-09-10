import { setupCanvas } from './js/canvas.js';

import { Game } from './js/game.js';

const canvas = document.querySelector('canvas');
const ctx = setupCanvas(canvas);

const scoreSpan = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');

const game = new Game(canvas, ctx);
function updateUI() {
  scoreSpan.textContent = game.score;
  timeLeft.textContent = game.timeLeft;
  requestAnimationFrame(updateUI);
}
game.start();
updateUI();
