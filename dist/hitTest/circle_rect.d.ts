/**
 * 1. If the circle is to the RIGHT of the square, check against the RIGHT edge.
 * 2. If the circle is to the LEFT of the square, check against the LEFT edge.
 * 3. If the circle is ABOVE the square, check against the TOP edge.
 * 4. If the circle is to the BELOW the square, check against the BOTTOM edge.
 */
import { Rect, Circle } from "../type";
export default function hitTest(o1: Circle, o2: Rect): boolean;
