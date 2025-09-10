export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const euclideanDistance = (dx, dy) => Math.sqrt(dx * dx + dy * dy);
