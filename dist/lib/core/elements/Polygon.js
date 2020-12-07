export default function Polygon(ctx, { style, path }) {
    ctx.fillStyle = style;
    ctx.beginPath();
    const [startX, startY] = path[0];
    ctx.moveTo(startX, startY);
    for (const [x, y] of path) {
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}
//# sourceMappingURL=Polygon.js.map