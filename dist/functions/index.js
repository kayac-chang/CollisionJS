import { mul, add } from "../../lib/vec2";
/**
 * elastic collisions
 *    vf = ( (m1 - m2) * v1 + (2 * m2) * v2 ) / m1 + m2
 */
export function elastic_collision(v1, v2, m1, m2) {
    const a = mul(v1, (m1 - m2) / (m1 + m2));
    const b = mul(v2, (2 * m2) / (m1 + m2));
    return add(a, b);
}
//# sourceMappingURL=index.js.map