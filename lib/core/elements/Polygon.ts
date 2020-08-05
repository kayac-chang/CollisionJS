import { Context } from "../types";
import { IPolygon } from "./types";

export default function Polygon(ctx: Context, { style, path }: IPolygon) {
  ctx.fillStyle = style;

  ctx.beginPath();

  const [startX, startY] = path[0];
  ctx.moveTo(startX, startY);

  for (const [x, y] of path) {
    ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fill();
}
