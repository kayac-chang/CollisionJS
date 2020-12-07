export default function Rect(ctx, { style, position, size }) {
    ctx.fillStyle = style;
    const [x, y] = position;
    const [w, h] = size;
    ctx.fillRect(x, y, w, h);
}
//# sourceMappingURL=Rect.js.map