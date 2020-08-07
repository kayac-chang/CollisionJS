function Delta(prev: number) {
  return (cur: number) => {
    const delta = (cur - prev) / 1000;

    prev = cur;

    return delta;
  };
}

type UpdateFn = (delta: number) => void;

export default function Ticker() {
  const updateFns: UpdateFn[] = [];

  const getDelta = Delta(performance.now());
  update(getDelta(performance.now()));

  let destroy = false;

  return {
    add: (func: UpdateFn) => updateFns.push(func),
    destroy: () => (destroy = true),
  };

  function update(delta: number) {
    if (destroy) {
      return;
    }

    updateFns.forEach((fn) => fn(delta));

    requestAnimationFrame((now) => update(getDelta(now)));
  }
}
