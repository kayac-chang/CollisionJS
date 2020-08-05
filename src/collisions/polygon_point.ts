import { Vec2 } from "../../lib/vec2";

interface Polygon {
  path: Vec2[];
}

export default function hitTest({ path }: Polygon, [px, py]: Vec2) {
  let hit = false;

  path.forEach((cur, index) => {
    const next = path[(index + 1) % path.length];

    const [cx, cy] = cur;
    const [nx, ny] = next;

    const test1 = cy > py != ny > py;
    const test2 = px < ((nx - cx) * (py - cy)) / (ny - cy) + cx;

    if (test1 && test2) {
      hit = !hit;
    }
  });

  return hit;
}
