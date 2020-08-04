/**
 *  1. Is the X position of the point to the RIGHT of the LEFT EDGE?
 *  2. Is the X position of the point to the LEFT of the RIGHT EDGE?
 *  3. Is the Y position of the point BELOW the TOP EDGE?
 *  4. Is the Y position of the point ABOVE the BOTTOM EDGE?
 */

import { Vec2, Rect } from "./type";
import { inRange } from "./utils";

export default function hitTest([px, py]: Vec2, o2: Rect) {
  const [x, y] = o2.position;
  const [w, h] = o2.size;

  return inRange([x, x + w])(px) && inRange([y, y + h])(py);
}
