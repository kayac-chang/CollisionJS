import { Context } from "../types";
import { ILine } from "./types";

export default function Line(ctx: Context, { style, start, end }: ILine) {
  ctx.strokeStyle = style;

  ctx.beginPath();

  const [startX, startY] = start;
  ctx.moveTo(startX, startY);

  const [endX, endY] = end;
  ctx.lineTo(endX, endY);

  ctx.stroke();
}
