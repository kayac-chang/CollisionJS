import { forEachPath } from "../utils";
import { Polygon } from "../type";

import hitLine from "./polygon_line";
import inside from "./polygon_point";

export default function hitTest(p1: Polygon, p2: Polygon) {
  let hit = false;

  forEachPath(p1.path, (start, end) => {
    if (hit) {
      return;
    }

    if (hitLine(p2, { start, end })) {
      hit = true;
    }
  });

  return hit || inside(p1, p2.path[0]);
}
