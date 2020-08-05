export type Vec2 = [number, number];

export function mag([x, y]: Vec2) {
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
  return divide(v, mag(v));
}

export function add([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 {
  return [x1 + x2, y1 + y2];
}

export function sub([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 {
  return [x1 - x2, y1 - y2];
}

export function det([top, down]: [Vec2, Vec2]) {
  const [a, b] = top;
  const [c, d] = down;

  return a * d - b * c;
}
