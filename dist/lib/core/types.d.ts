import { IElement } from "./elements";
export declare type Context = CanvasRenderingContext2D;
export interface UpdateFn {
    (delta: number): IElement[];
}
export interface InitFn {
    (ctx: Context): UpdateFn;
}
export * from "./elements";
