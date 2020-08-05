import { forEachPath } from "./utils";
import { Polygon, Line } from "./type";
import hitLine from "./line_line";

export default function hitTest({ path }: Polygon, line: Line) {
  let hit = false;

  forEachPath(path, (start, end) => {
    if (hit) {
      return;
    }

    if (hitLine({ start, end }, line)) {
      hit = true;
    }
  });

  return hit;
}
