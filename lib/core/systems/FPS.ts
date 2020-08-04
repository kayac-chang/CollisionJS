import { Context } from "../types";

export default function FPSSystem(ctx: Context) {
  return function (delta: number) {
    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 30);
  };
}
