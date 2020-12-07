export default function FPSSystem(ctx) {
    return function (delta) {
        ctx.font = "25px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 30);
    };
}
//# sourceMappingURL=FPS.js.map