import { Context } from "../types";
import { ICircle } from "./types";

export default function Circle(
  ctx: Context,
  { style, position, radius }: ICircle
) {
  ctx.fillStyle = style;
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
