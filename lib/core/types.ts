import { IElement } from "./elements";

export type Context = CanvasRenderingContext2D;

export type Vec2 = [number, number];

export interface UpdateFn {
  (delta: number): IElement[];
}

export interface InitFn {
  (ctx: Context): UpdateFn;
}

export * from "./elements";
