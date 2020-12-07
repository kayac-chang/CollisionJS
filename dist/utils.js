import { det, sub } from "../lib/vec2";
export function inRange([x, y]) {
    const [min, max] = [Math.min(x, y), Math.max(x, y)];
    return (num) => num >= min && num <= max;
}
export function points({ position, size }) {
    const [x, y] = position;
    const [w, h] = size;
    return [x, x + w, y, y + h];
}
export function sum(nums) {
    return nums.reduce((a, b) => a + b);
}
export function clamp([x, y], num) {
    return inRange([x, y])(num) ? num : num > x ? y : x;
}
export function triangleArea([t1, t2, t3]) {
    return Math.abs(det([
        //
        sub(t2, t1),
        sub(t3, t1),
    ]));
}
export function forEachPath(path, func) {
    path.forEach((cur, index) => func(cur, path[(index + 1) % path.length]));
}
//# sourceMappingURL=utils.js.map