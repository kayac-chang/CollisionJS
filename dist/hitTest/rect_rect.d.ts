/**
 * 1. Is the RIGHT edge of o1 to the RIGHT of the LEFT edge of o2?
 * 2. Is the LEFT edge of o1 to the LEFT of the RIGHT edge of o2?
 * 3. Is the BOTTOM edge of o1 BELOW the TOP edge of o2?
 * 4. Is the TOP edge of o1 ABOVE the BOTTOM edge of o2?
 */
import { Rect } from "../type";
export default function hitTest(o1: Rect, o2: Rect): boolean;
