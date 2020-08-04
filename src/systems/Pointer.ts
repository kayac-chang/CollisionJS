export default function PointerSystem(target: HTMLElement) {
  const position = { x: 0, y: 0 };

  function update({ offsetX, offsetY }: PointerEvent) {
    Object.assign(position, {
      x: offsetX,
      y: offsetY,
    });
  }

  target.addEventListener("pointerenter", update);

  target.addEventListener("pointermove", update);

  target.addEventListener("pointerleave", update);

  return () => position;
}
