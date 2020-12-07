/**
 * Test if point hit the line segment
 */
import { mag } from "../../lib/vec2";
export default function hitTest([px, py], o2) {
    const [x1, y1] = o2.start;
    const [x2, y2] = o2.end;
    const d1 = mag([px - x1, py - y1]) + mag([px - x2, py - y2]);
    const d2 = mag([x1 - x2, y1 - y2]);
    return Math.abs(d1 - d2) < 1;
}
//# sourceMappingURL=point_line.js.map