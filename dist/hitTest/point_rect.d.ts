/**
 *  1. Is the X position of the point to the RIGHT of the LEFT EDGE?
 *  2. Is the X position of the point to the LEFT of the RIGHT EDGE?
 *  3. Is the Y position of the point BELOW the TOP EDGE?
 *  4. Is the Y position of the point ABOVE the BOTTOM EDGE?
 */
import { Rect } from "../type";
import { Vec2 } from "../../lib/vec2";
export default function hitTest([px, py]: Vec2, o2: Rect): boolean;
