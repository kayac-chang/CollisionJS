/**
 *  1. Is the X position of the point to the RIGHT of the LEFT EDGE?
 *  2. Is the X position of the point to the LEFT of the RIGHT EDGE?
 *  3. Is the Y position of the point BELOW the TOP EDGE?
 *  4. Is the Y position of the point ABOVE the BOTTOM EDGE?
 */

import { Rect } from "../type";
import { inRange, points } from "../utils";
import { Vec2 } from "../../lib/vec2";

export default function hitTest([px, py]: Vec2, o2: Rect) {
  const [r1, r2, r3, r4] = points(o2);

  return [
    //
    inRange([r1, r2])(px),
    inRange([r3, r4])(py),
  ].every(Boolean);
}
