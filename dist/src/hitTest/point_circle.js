/**
 * Check if a point is inside a circle.
 */
import { mag } from "../../lib/vec2";
export default function hitTest([x1, y1], circle) {
    const [x2, y2] = circle.position;
    const r = circle.radius;
    const dx = x1 - x2;
    const dy = y1 - y2;
    return mag([dx, dy]) <= r;
}
//# sourceMappingURL=point_circle.js.map