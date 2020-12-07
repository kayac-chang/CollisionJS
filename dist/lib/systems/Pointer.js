export default function PointerSystem(target) {
    const position = [0, 0];
    function update({ offsetX, offsetY }) {
        Object.assign(position, [offsetX, offsetY]);
    }
    target.addEventListener("pointerenter", update);
    target.addEventListener("pointermove", update);
    target.addEventListener("pointerleave", update);
    return () => position;
}
//# sourceMappingURL=Pointer.js.map