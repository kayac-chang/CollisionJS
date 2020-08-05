import { Vec2 } from "../lib/vec2";
import { forEachPath } from "./utils";
import { Polygon } from "./type";

export default function hitTest({ path }: Polygon, [px, py]: Vec2) {
  let hit = false;

  forEachPath(path, ([cx, cy], [nx, ny]) => {
    const test1 = cy > py != ny > py;
    const test2 = px < ((nx - cx) * (py - cy)) / (ny - cy) + cx;

    if (test1 && test2) {
      hit = !hit;
    }
  });

  return hit;
}
