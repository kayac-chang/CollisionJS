/**
 * Test if point hit the line segment
 */

import { Vec2, Line } from "./type";
import { magnitude } from "./utils";

export default function hitTest([px, py]: Vec2, o2: Line) {
  const [x1, y1] = o2.start;
  const [x2, y2] = o2.end;

  const d1 = magnitude([px - x1, py - y1]) + magnitude([px - x2, py - y2]);
  const d2 = magnitude([x1 - x2, y1 - y2]);

  return Math.abs(d1 - d2) < 1;
}
