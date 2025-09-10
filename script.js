import { setupCanvas } from './js/canvas.js';
import { Circle } from './js/circle.js';

let circles = [];
const canvas = document.querySelector('canvas');
const ctx = setupCanvas(canvas);
let score = 0;
const scoreSpan = document.querySelector('#score');

const addRandom = () => {
  Circle.spawn(canvas);
};

setInterval(addRandom, 500);

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for (const circle of Circle.getCircles()) {
    if (circle.isClicked(mouseX, mouseY)) {
      score += circle.onClick();
      break;
    }
  }
});
const gameLoop = () => {
  scoreSpan.textContent = score;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Circle.getCircles().forEach((c) => c.update());
  Circle.filter();
  Circle.getCircles().forEach((c) => c.draw(ctx));

  requestAnimationFrame(gameLoop);
};

gameLoop();
