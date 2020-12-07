import { resize } from "./utils";
import Ticker from "./Ticker";
import { RenderSystem, FPSSystem, ClearSystem } from "./systems";
export default function Game(canvas, init) {
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
//# sourceMappingURL=Game.js.map