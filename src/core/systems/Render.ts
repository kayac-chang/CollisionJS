import { IElement, Rect, Circle, IRect, ICircle } from "../elements";
import { Context } from "../types";

export default function RenderSystem(
  ctx: Context,
  update: (delta: number) => IElement[]
) {
  return function (delta: number) {
    update(delta).forEach((element) => {
      if (element.type === "rect") {
        return Rect(ctx, element as IRect);
      }

      if (element.type === "circle") {
        return Circle(ctx, element as ICircle);
      }
    });
  };
}
