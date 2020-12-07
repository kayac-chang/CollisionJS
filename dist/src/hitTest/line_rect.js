import _hit from "./line_line";
export default function hitTest(o1, o2) {
    const [x, y] = o2.position;
    const [w, h] = o2.size;
    const r1 = [x, y];
    const r2 = [x + w, y];
    const r3 = [x, y + h];
    const r4 = [x + w, y + h];
    return [
        { start: r1, end: r2 },
        { start: r2, end: r4 },
        { start: r4, end: r3 },
        { start: r3, end: r1 },
    ].some((line) => _hit(o1, line));
}
//# sourceMappingURL=line_rect.js.map