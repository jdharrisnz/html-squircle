import { clipSquircle } from "./clipSquircle.js";
import type { RefObject } from "react";
import type { Types } from "./types.js";
/**
 * Compute a `clipSquircle` at the size of the `ref`'d element. The returned
 * object has a stable reference, so can be applied straight to the `style` prop
 * of your element.
 *
 * Memoizes the result across all components by using a simple LRU cache, with a
 * default size of 20. Set the default size by passing a `cacheLimit` argument.
 *
 * There's no need to ensure the params argument has a stable reference.
 *
 * Uses a `ResizeObserver` to keep in sync with the element.
 */
export declare const useClipSquircle: <T extends Element>({ curveLength, roundness }: Omit<Types.SquircleOptionsClip, "width" | "height">, ref: RefObject<T>, cacheCapacity?: number) => {
    readonly clipPath: ReturnType<typeof clipSquircle>;
};
//# sourceMappingURL=useClipSquircle.d.ts.map