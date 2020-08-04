import { resize } from "./utils";
import Ticker from "./Ticker";
import { RenderSystem, FPSSystem, ClearSystem } from "./systems";
import { InitFn } from "./types";

export default function Game(world: InitFn) {
  const canvas = document.createElement("canvas");

  document.body.append(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw `Your browser not support canvas api..`;
  }

  resize(ctx);

  const setting = {
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };

  const ticker = Ticker();
  ticker.add(ClearSystem(ctx));
  ticker.add(RenderSystem(ctx, world(setting)));
  ticker.add(FPSSystem(ctx));
}
