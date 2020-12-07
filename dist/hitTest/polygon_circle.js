import { forEachPath } from "../utils";
import hitLine from "./line_circle";
import inside from "./polygon_point";
export default function hitTest({ path }, circle) {
    let hit = false;
    forEachPath(path, (start, end) => {
        if (hit) {
            return;
        }
        if (hitLine({ start, end }, circle)) {
            hit = true;
        }
    });
    return hit || inside({ path }, circle.position);
}
//# sourceMappingURL=polygon_circle.js.map