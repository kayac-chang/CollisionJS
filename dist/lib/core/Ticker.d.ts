declare type UpdateFn = (delta: number) => void;
export default function Ticker(): {
    add: (func: UpdateFn) => number;
    destroy: () => boolean;
};
export {};
