import { Rect } from "./type";
import { Vec2, det, sub } from "../../lib/vec2";

export function inRange([x, y]: Vec2) {
  const [min, max] = [Math.min(x, y), Math.max(x, y)];

  return (num: number) => num >= min && num <= max;
}

export function points({ position, size }: Rect) {
  const [x, y] = position;
  const [w, h] = size;

  return [x, x + w, y, y + h];
}

export function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b);
}

export function clamp([x, y]: Vec2, num: number) {
  return inRange([x, y])(num) ? num : num > x ? y : x;
}

export function triangleArea([t1, t2, t3]: [Vec2, Vec2, Vec2]) {
  return Math.abs(
    det([
      //
      sub(t2, t1),
      sub(t3, t1),
    ])
  );
}

type ForEachFunc = (cur: Vec2, next: Vec2) => void;

export function forEachPath(path: Vec2[], func: ForEachFunc) {
  path.forEach((cur, index) => func(cur, path[(index + 1) % path.length]));
}
