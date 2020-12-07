import { forEachPath } from "../utils";
export default function hitTest({ path }, [px, py]) {
    let hit = false;
    forEachPath(path, ([cx, cy], [nx, ny]) => {
        const test1 = cy > py != ny > py;
        const test2 = px < ((nx - cx) * (py - cy)) / (ny - cy) + cx;
        if (test1 && test2) {
            hit = !hit;
        }
    });
    return hit;
}
//# sourceMappingURL=polygon_point.js.map