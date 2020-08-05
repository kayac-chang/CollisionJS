import { Rect } from "./type";
import { Vec2 } from "../../lib/vec2";

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

export function forEachPath(
  path: Vec2[],
  func: (cur: Vec2, next: Vec2) => void
) {
  path.forEach((cur, index) => {
    const next = path[(index + 1) % path.length];

    func(cur, next);
  });
}
