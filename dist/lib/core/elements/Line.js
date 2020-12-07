export default function Line(ctx, { style, start, end }) {
    ctx.strokeStyle = style;
    ctx.beginPath();
    const [startX, startY] = start;
    ctx.moveTo(startX, startY);
    const [endX, endY] = end;
    ctx.lineTo(endX, endY);
    ctx.stroke();
}
//# sourceMappingURL=Line.js.map