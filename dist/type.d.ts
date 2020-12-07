import { Vec2 } from "../lib/vec2";
export interface RigidBody {
    position: Vec2;
    velocity: Vec2;
    acceleration: Vec2;
    mass: number;
}
export interface Circle {
    position: Vec2;
    radius: number;
}
export declare function isCircle(obj: any): obj is Circle;
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
export interface Triangle {
    path: [Vec2, Vec2, Vec2];
}
