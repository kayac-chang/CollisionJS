import { Context } from "../types";

export default function ClearSystem(ctx: Context) {
  const canvas = ctx.canvas;

  return function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
