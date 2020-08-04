/**
 *  Test if collision between two points.
 */

import { Vec2 } from "./type";
import _hitTest from "./circle_circle";

function Buffer(position: Vec2, radius: number = 1) {
  return { position, radius };
}

export default function hitTest(o1: Vec2, o2: Vec2) {
  return _hitTest(Buffer(o1), Buffer(o2));
}
