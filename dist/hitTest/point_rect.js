/**
 *  1. Is the X position of the point to the RIGHT of the LEFT EDGE?
 *  2. Is the X position of the point to the LEFT of the RIGHT EDGE?
 *  3. Is the Y position of the point BELOW the TOP EDGE?
 *  4. Is the Y position of the point ABOVE the BOTTOM EDGE?
 */
import { inRange, points } from "../utils";
export default function hitTest([px, py], o2) {
    const [r1, r2, r3, r4] = points(o2);
    return [
        //
        inRange([r1, r2])(px),
        inRange([r3, r4])(py),
    ].every(Boolean);
}
//# sourceMappingURL=point_rect.js.map