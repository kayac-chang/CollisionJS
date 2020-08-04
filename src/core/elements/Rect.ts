import { Context } from "../types";
import { IRect } from "./types";

export default function Rect(ctx: Context, { style, position, size }: IRect) {
  ctx.fillStyle = style;
  ctx.fillRect(position.x, position.y, size.x, size.y);
}
