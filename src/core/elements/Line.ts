import { Vec2, Context } from "../types";

export default function Line(ctx: Context, { style, start, end }: Props) {
  ctx.strokeStyle = style;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}
