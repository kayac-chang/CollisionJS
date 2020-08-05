import "./index.scss";
import { Game, IElement, Context, ITriangle } from "../lib/core";
import { PointerSystem } from "../lib/systems";

import hitTest from "../src";

function main({ canvas }: Context) {
  const background = {
    type: "rect",
    style: "#ffffff",
    position: [0, 0],
    size: [canvas.width, canvas.height],
  };

  const test: ITriangle = {
    type: "polygon",
    style: "#0099b0",
    path: [
      [250, 250],
      [450, 250],
      [650, 550],
    ],
  };

  const getPosition = PointerSystem(canvas);

  return function (delta: number) {
    const pos = getPosition();

    test.style = hitTest.triangle_point(test, pos) ? "#ff8080" : "#0099b0";

    return [background, test] as IElement[];
  };
}

const view = document.getElementById("root") as HTMLCanvasElement;
Game(view, main);
