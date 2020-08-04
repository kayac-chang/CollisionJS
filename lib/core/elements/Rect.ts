import { Context } from "../types";
import { IRect } from "./types";

export default function Rect(ctx: Context, { style, position, size }: IRect) {
  ctx.fillStyle = style;

  const [x, y] = position;
  const [w, h] = size;

  ctx.fillRect(x, y, w, h);
}
