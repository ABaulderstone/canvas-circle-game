import { randomInt, euclideanDistance } from './utils.js';

export class Circle {
  static arr = [];

  static filter() {
    Circle.arr = Circle.arr.filter((c) => c.alive);
  }

  static spawn(canvas) {
    let x;
    let y;
    let valid = false;
    let attempts = 0;
    while (!valid && attempts < 30) {
      attempts++;
      x = randomInt(40, canvas.width - 40);
      y = randomInt(40, canvas.height - 40);
      const newCircle = new Circle(x, y, 'blue');
      valid = Circle.arr.every((c) => !Circle.doesOverlap(c, newCircle));
      if (valid) {
        Circle.arr.push(newCircle);
      }
    }
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
    console.log('clicked');
    return this.points;
  }
}
