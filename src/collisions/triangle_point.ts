import { Vec2 } from "../../lib/vec2";
import { triangleArea, sum } from "./utils";
import { Triangle } from "./type";

export default function hitTest({ path }: Triangle, p: Vec2) {
  const [t1, t2, t3] = path;

  const area = triangleArea(path);
  const area1 = triangleArea([t1, t2, p]);
  const area2 = triangleArea([t2, t3, p]);
  const area3 = triangleArea([t3, t1, p]);

  return sum([area1, area2, area3]) === area;
}
