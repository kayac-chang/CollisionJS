import { Context, UpdateFn } from "../types";
export default function RenderSystem(ctx: Context, update: UpdateFn): (delta: number) => void;
