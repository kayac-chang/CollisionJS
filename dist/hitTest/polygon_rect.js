import { forEachPath } from "../utils";
import hitLine from "./line_rect";
import inside from "./polygon_point";
export default function hitTest({ path }, rect) {
    let hit = false;
    forEachPath(path, (start, end) => {
        if (hit) {
            return;
        }
        if (hitLine({ start, end }, rect)) {
            hit = true;
        }
    });
    return hit || inside({ path }, rect.position);
}
//# sourceMappingURL=polygon_rect.js.map