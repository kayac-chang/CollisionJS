import { Vec2 } from "../../vec2";
declare type ElementType = "rect" | "circle" | "line" | "text" | "polygon";
export interface IElement {
    type: ElementType;
}
export interface ICircle extends IElement {
    type: "circle";
    style: string;
    position: Vec2;
    radius: number;
}
export interface IRect extends IElement {
    type: "rect";
    style: string;
    position: Vec2;
    size: Vec2;
}
export interface ILine extends IElement {
    type: "line";
    style: string;
    start: Vec2;
    end: Vec2;
}
export interface IText extends IElement {
    type: "text";
    style: string;
    msg: string;
    position: Vec2;
}
export interface IPolygon {
    type: "polygon";
    style: string;
    path: Vec2[];
}
export interface ITriangle extends IPolygon {
    path: [Vec2, Vec2, Vec2];
}
export {};
