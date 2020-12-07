/**
 *  Test if collision between two points.
 */
export default function hitTest([x1, y1], [x2, y2]) {
    return [
        //
        x1 - x2,
        y1 - y2,
    ].every((num) => Math.abs(num) < 1);
}
//# sourceMappingURL=point_point.js.map