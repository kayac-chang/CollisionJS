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

export function magnitude([x, y]: Vec2) {
  return Math.sqrt(x * x + y * y);
}

export function dot([x1, y1]: Vec2, [x2, y2]: Vec2) {
  return x1 * x2 + y1 * y2;
}

export function mul([x, y]: Vec2, scaler: number): Vec2 {
  return [x * scaler, y * scaler];
}

export function divide([x, y]: Vec2, scaler: number): Vec2 {
  return [x / scaler, y / scaler];
}

export function normalize(v: Vec2) {
  return divide(v, magnitude(v));
}

export function add([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 {
  return [x1 + x2, y1 + y2];
}

export function sub([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 {
  return [x1 - x2, y1 - y2];
}
