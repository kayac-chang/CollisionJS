import { forEachPath } from "./utils";
import { Polygon, Circle } from "./type";
import hitLine from "./line_circle";
import inside from "./polygon_point";

export default function hitTest({ path }: Polygon, circle: Circle) {
  let hit = false;

  forEachPath(path, (start, end) => {
    if (hitLine({ start, end }, circle)) {
      hit = true;
    }
  });

  return hit || inside({ path }, circle.position);
}
