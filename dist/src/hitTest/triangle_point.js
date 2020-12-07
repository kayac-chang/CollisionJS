import { triangleArea, sum } from "../utils";
export default function hitTest({ path }, p) {
    const [t1, t2, t3] = path;
    const area = triangleArea(path);
    const area1 = triangleArea([t1, t2, p]);
    const area2 = triangleArea([t2, t3, p]);
    const area3 = triangleArea([t3, t1, p]);
    return sum([area1, area2, area3]) === area;
}
//# sourceMappingURL=triangle_point.js.map