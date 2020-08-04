/**
 *  Test if collision between two points.
 */

import { Vec2 } from "./type";

export default function hitTest([x1, y1]: Vec2, [x2, y2]: Vec2) {
  return [
    //
    x1 - x2,
    y1 - y2,
  ].every((num) => Math.abs(num) < 1);
}
