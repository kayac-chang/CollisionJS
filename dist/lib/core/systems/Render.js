import { Rect, Circle, Line, Polygon, } from "../elements";
function Renderer(ctx) {
    return function (element) {
        if (element.type === "rect") {
            return Rect(ctx, element);
        }
        if (element.type === "circle") {
            return Circle(ctx, element);
        }
        if (element.type === "line") {
            return Line(ctx, element);
        }
        if (element.type === "polygon") {
            return Polygon(ctx, element);
        }
    };
}
export default function RenderSystem(ctx, update) {
    return function (delta) {
        update(delta).forEach(Renderer(ctx));
    };
}
//# sourceMappingURL=Render.js.map