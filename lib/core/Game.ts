import { resize } from "./utils";
import Ticker from "./Ticker";
import { RenderSystem, FPSSystem, ClearSystem } from "./systems";
import { InitFn } from "./types";

export default function Game(canvas: HTMLCanvasElement, init: InitFn) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw `Your browser not support canvas api..`;
  }

  resize(ctx);

  const ticker = Ticker();
  ticker.add(ClearSystem(ctx));
  ticker.add(RenderSystem(ctx, init(ctx)));
  ticker.add(FPSSystem(ctx));
}
