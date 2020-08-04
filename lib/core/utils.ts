import { Context } from "./types";

export function resize({ canvas }: Context) {
  const { clientWidth, clientHeight } = canvas;
  canvas.width = clientWidth;
  canvas.height = clientHeight;
}
