export default function Text(ctx, { style, msg, position }) {
    ctx.fillStyle = style;
    const [x, y] = position;
    ctx.fillText(msg, x, y);
}
//# sourceMappingURL=Text.js.map