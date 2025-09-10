import { randomInt, euclideanDistance } from './utils.js';

export class Circle {
  static filter(circles) {
    return circles.filter((c) => c.alive);
  }

  static getCircles() {
    return this.arr;
  }

  static doesOverlap(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = euclideanDistance(dx, dy);
    return distance < circle1.radius + circle2.radius;
  }

  constructor(x, y, color, radius = 40, shrinkRate = 0.15) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.shrinkRate = shrinkRate;
    this.points = radius;
    this.alive = true;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.radius -= this.shrinkRate;
    this.points = Math.floor(this.radius);
    if (this.radius < 20) {
      this.alive = false;
    }
  }

  isClicked(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = euclideanDistance(dx, dy);
    return distance <= this.radius;
  }

  onClick() {
    this.alive = false;
    return this.points;
  }
}
