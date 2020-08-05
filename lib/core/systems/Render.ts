import {
  Rect,
  Circle,
  IRect,
  ICircle,
  IElement,
  Line,
  ILine,
  Polygon,
  IPolygon,
} from "../elements";
import { Context, UpdateFn } from "../types";

function Renderer(ctx: Context) {
  return function (element: IElement) {
    if (element.type === "rect") {
      return Rect(ctx, element as IRect);
    }

    if (element.type === "circle") {
      return Circle(ctx, element as ICircle);
    }

    if (element.type === "line") {
      return Line(ctx, element as ILine);
    }

    if (element.type === "polygon") {
      return Polygon(ctx, element as IPolygon);
    }
  };
}

export default function RenderSystem(ctx: Context, update: UpdateFn) {
  return function (delta: number) {
    update(delta).forEach(Renderer(ctx));
  };
}
