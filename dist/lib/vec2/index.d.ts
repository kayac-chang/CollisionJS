export declare type Vec2 = [number, number];
export declare function mag([x, y]: Vec2): number;
export declare function dot([x1, y1]: Vec2, [x2, y2]: Vec2): number;
export declare function mul([x, y]: Vec2, scaler: number): Vec2;
export declare function divide([x, y]: Vec2, scaler: number): Vec2;
export declare function normalize(v: Vec2): Vec2;
export declare function add([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2;
export declare function sub([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2;
export declare function det([top, down]: [Vec2, Vec2]): number;
