import { Vec2, Rect } from "./type";

export function inRange([x, y]: Vec2) {
  const [min, max] = [Math.min(x, y), Math.max(x, y)];

  return (num: number) => num >= min && num <= max;
}

export function points({ position, size }: Rect) {
  const [x, y] = position;
  const [w, h] = size;

  return [x, x + w, y, y + h];
}

export function clamp([x, y]: Vec2, num: number) {
  return inRange([x, y])(num) ? num : num > x ? y : x;
}

export function distance([x, y]: Vec2) {
  return Math.sqrt(x * x + y * y);
}
