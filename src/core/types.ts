import { IElement } from "./elements";

export type Context = CanvasRenderingContext2D;

export interface Vec2 {
  x: number;
  y: number;
}

export interface Setting {
  width: number;
  height: number;
}

export interface UpdateFn {
  (delta: number): IElement[];
}

export interface InitFn {
  (setting: Setting): UpdateFn;
}

export * from "./elements";
