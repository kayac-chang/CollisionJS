import "./index.scss";
import { Game, Setting, IElement } from "./core";

function main({ width, height }: Setting) {
  const rect = {
    type: "rect",
    style: "#ffffff",
    position: { x: 0, y: 0 },
    size: { x: width, y: height },
  };

  const circle = {
    type: "circle",
    style: "#ff8080",
    position: { x: 250, y: 250 },
    radius: 50,
  };

  return function (delta: number) {
    circle.position.x += 50 * delta;

    return [rect, circle] as IElement[];
  };
}

Game(main);
