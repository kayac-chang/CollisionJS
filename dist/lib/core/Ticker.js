function Delta(prev) {
    return (cur) => {
        const delta = (cur - prev) / 1000;
        prev = cur;
        return delta;
    };
}
export default function Ticker() {
    const updateFns = [];
    const getDelta = Delta(performance.now());
    update(getDelta(performance.now()));
    let destroy = false;
    return {
        add: (func) => updateFns.push(func),
        destroy: () => (destroy = true),
    };
    function update(delta) {
        if (destroy) {
            return;
        }
        updateFns.forEach((fn) => fn(delta));
        requestAnimationFrame((now) => update(getDelta(now)));
    }
}
//# sourceMappingURL=Ticker.js.map