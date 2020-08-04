import { Context } from "../types";
import { ICircle } from "./types";

export default function Circle(
  ctx: Context,
  { style, position, radius }: ICircle
) {
  ctx.fillStyle = style;

  ctx.beginPath();

  const [x, y] = position;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);

  ctx.fill();
}
