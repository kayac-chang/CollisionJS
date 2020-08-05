/**
 * 1. If the circle is to the RIGHT of the square, check against the RIGHT edge.
 * 2. If the circle is to the LEFT of the square, check against the LEFT edge.
 * 3. If the circle is ABOVE the square, check against the TOP edge.
 * 4. If the circle is to the BELOW the square, check against the BOTTOM edge.
 */

import { Rect, Circle } from "./type";
import { points, clamp } from "./utils";
import { mag } from "../lib/vec2";

export default function hitTest(o1: Circle, o2: Rect) {
  const [r1, r2, r3, r4] = points(o2);
  const [cx, cy] = o1.position;
  const r = o1.radius;

  const [dx, dy] = [
    //
    cx - clamp([r1, r2], cx),
    cy - clamp([r3, r4], cy),
  ];

  return mag([dx, dy]) <= r;
}
