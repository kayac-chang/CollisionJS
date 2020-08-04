export default function PointerSystem(target: HTMLElement) {
  const position: [number, number] = [0, 0];

  function update({ offsetX, offsetY }: PointerEvent) {
    Object.assign(position, [offsetX, offsetY]);
  }

  target.addEventListener("pointerenter", update);

  target.addEventListener("pointermove", update);

  target.addEventListener("pointerleave", update);

  return () => position;
}
