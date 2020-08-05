import { Vec2 } from "../../lib/vec2";

export interface Circle {
  position: Vec2;
  radius: number;
}

export interface Rect {
  position: Vec2;
  size: Vec2;
}

export interface Line {
  start: Vec2;
  end: Vec2;
}

export interface Ray {
  start: Vec2;
  dir: Vec2;
}

export interface Polygon {
  path: Vec2[];
}
