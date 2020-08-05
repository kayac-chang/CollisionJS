import { Line, Circle } from "./type";
import isPointInCircle from "./point_circle";
import isPointOnLine from "./point_line";
import { mag, normalize, add, mul, dot, sub } from "../lib/vec2";

export default function hitTest(o1: Line, o2: Circle) {
  if ([o1.start, o1.end].some((point) => isPointInCircle(point, o2))) {
    return true;
  }

  const v = normalize(sub(o1.end, o1.start));

  const w = sub(o2.position, o1.start);

  const p = add(o1.start, mul(v, dot(v, w)));

  if (!isPointOnLine(p, o1)) {
    return false;
  }

  return mag(sub(o2.position, p)) < o2.radius;
}
