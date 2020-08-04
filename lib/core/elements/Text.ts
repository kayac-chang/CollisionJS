import { Context } from "../types";
import { IText } from "./types";

export default function Text(ctx: Context, { style, msg, position }: IText) {
  ctx.fillStyle = style;

  const [x, y] = position;
  ctx.fillText(msg, x, y);
}
