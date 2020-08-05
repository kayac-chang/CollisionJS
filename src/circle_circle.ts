/**
 * Check if two circles are colliding.
 */

import { Circle } from "./type";
import { mag } from "../lib/vec2";

export default function hitTest(o1: Circle, o2: Circle) {
  const [x1, y1] = o1.position;
  const [x2, y2] = o2.position;
  const r1 = o1.radius;
  const r2 = o2.radius;

  const dx = x1 - x2;
  const dy = y1 - y2;

  return mag([dx, dy]) <= r1 + r2;
}
