export function mag([x, y]) {
    return Math.sqrt(x * x + y * y);
}
export function dot([x1, y1], [x2, y2]) {
    return x1 * x2 + y1 * y2;
}
export function mul([x, y], scaler) {
    return [x * scaler, y * scaler];
}
export function divide([x, y], scaler) {
    return [x / scaler, y / scaler];
}
export function normalize(v) {
    return divide(v, mag(v));
}
export function add([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2];
}
export function sub([x1, y1], [x2, y2]) {
    return [x1 - x2, y1 - y2];
}
export function det([top, down]) {
    const [a, b] = top;
    const [c, d] = down;
    return a * d - b * c;
}
//# sourceMappingURL=index.js.map