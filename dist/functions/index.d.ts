import { Vec2 } from "../../lib/vec2";
/**
 * elastic collisions
 *    vf = ( (m1 - m2) * v1 + (2 * m2) * v2 ) / m1 + m2
 */
export declare function elastic_collision(v1: Vec2, v2: Vec2, m1: number, m2: number): any;
