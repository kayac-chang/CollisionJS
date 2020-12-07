import { forEachPath } from "../utils";
import hitLine from "./line_line";
export default function hitTest({ path }, line) {
    let hit = false;
    forEachPath(path, (start, end) => {
        if (hit) {
            return;
        }
        if (hitLine({ start, end }, line)) {
            hit = true;
        }
    });
    return hit;
}
//# sourceMappingURL=polygon_line.js.map