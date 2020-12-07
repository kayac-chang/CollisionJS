export default function ClearSystem(ctx) {
    const canvas = ctx.canvas;
    return function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}
//# sourceMappingURL=Clear.js.map