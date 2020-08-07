/**
 * 1. Is the RIGHT edge of o1 to the RIGHT of the LEFT edge of o2?
 * 2. Is the LEFT edge of o1 to the LEFT of the RIGHT edge of o2?
 * 3. Is the BOTTOM edge of o1 BELOW the TOP edge of o2?
 * 4. Is the TOP edge of o1 ABOVE the BOTTOM edge of o2?
 */

import { Rect } from "../type";
import { points } from "../utils";

export default function hitTest(o1: Rect, o2: Rect) {
  const [a1, a2, a3, a4] = points(o1);
  const [b1, b2, b3, b4] = points(o2);

  return [
    //
    a2 >= b1,
    a1 <= b2,
    a4 >= b3,
    a3 <= b4,
  ].every(Boolean);
}
