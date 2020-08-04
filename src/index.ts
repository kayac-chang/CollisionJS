import "./index.scss";
import { Game, IElement, Context } from "./core";
import { PointerSystem } from "./systems";

function main({ canvas }: Context) {
  const rect = {
    type: "rect",
    style: "#ffffff",
    position: { x: 0, y: 0 },
    size: { x: canvas.width, y: canvas.height },
  };

  const circle = {
    type: "circle",
    style: "#ff8080",
    position: { x: 0, y: 0 },
    radius: 50,
  };

  const getPosition = PointerSystem(canvas);

  return function (delta: number) {
    circle.position = getPosition();
    // circle.position.x += 50 * delta;

    return [rect, circle] as IElement[];
  };
}

Game(document.getElementById("root") as HTMLCanvasElement, main);
