export type Vec2 = [number, number];

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
