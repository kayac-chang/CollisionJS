import { Vec2 } from "../../vec2";

type ElementType = "rect" | "circle" | "line" | "text";

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
