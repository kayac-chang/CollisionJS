import "./index.scss";
import {
  Game,
  IElement,
  Context,
  IRect,
  ILine,
  IPolygon,
  ICircle,
} from "../lib/core";
import { PointerSystem } from "../lib/systems";
import { hitTest } from "./collisions";
import { add } from "../lib/vec2";

function main({ canvas }: Context) {
  const background = {
    type: "rect",
    style: "#ffffff",
    position: [0, 0],
    size: [canvas.width, canvas.height],
  };

  // const test: ICircle = {
  //   type: "circle",
  //   style: "#0099b0",
  //   position: [250, 250],
  //   radius: 10,
  // };

  // const test: IRect = {
  //   type: "rect",
  //   style: "#0099b0",
  //   position: [250, 250],
  //   size: [100, 100],
  // };

  // const test: ILine = {
  //   type: "line",
  //   style: "#0099b0",
  //   start: [400, 250],
  //   end: [250, 400],
  // };

  const test: IPolygon = {
    type: "polygon",
    style: "#0099b0",
    path: [
      [250, 250],
      [450, 250],
      [650, 550],
      [150, 550],
    ],
  };

  // const pointer: ICircle = {
  //   type: "circle",
  //   style: "#888",
  //   position: [0, 0],
  //   radius: 10,
  // };

  // const pointer: ILine = {
  //   type: "line",
  //   style: "#888",
  //   start: [0, 0],
  //   end: [0, 0],
  // };

  // const pointer: IRect = {
  //   type: "rect",
  //   style: "#888",
  //   position: [0, 0],
  //   size: [50, 50],
  // };

  const pointer: IPolygon = {
    type: "polygon",
    style: "#888",
    path: [
      [0, 0],
      [100, 100],
      [-100, 100],
    ],
  };

  const getPosition = PointerSystem(canvas);

  return function (delta: number) {
    const clone = { ...pointer };

    const pos = getPosition();

    clone.path = clone.path.map((v) => add(v, pos));

    test.style = hitTest(test, clone) ? "#ff8080" : "#0099b0";

    return [background, test, clone] as IElement[];
  };
}

const view = document.getElementById("root") as HTMLCanvasElement;
Game(view, main);
