/**
 * Check if a point is inside a circle.
 */

import { Circle } from "./type";
import { mag, Vec2 } from "../lib/vec2";

export default function hitTest([x1, y1]: Vec2, circle: Circle) {
  const [x2, y2] = circle.position;
  const r = circle.radius;

  const dx = x1 - x2;
  const dy = y1 - y2;

  return mag([dx, dy]) <= r;
}
