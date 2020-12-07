export default function Circle(ctx, { style, position, radius }) {
    ctx.fillStyle = style;
    ctx.beginPath();
    const [x, y] = position;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
//# sourceMappingURL=Circle.js.map