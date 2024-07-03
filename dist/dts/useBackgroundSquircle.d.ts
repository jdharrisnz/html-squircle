import { backgroundSquircle } from "./backgroundSquircle.js";
import type { RefObject } from "react";
import type { Types } from "./types.js";
/**
 * Compute a `backgroundSquircle` at the size of the `ref`'d element. The
 * returned object has a stable reference, so can be applied straight to the
 * `style` prop of your element.
 *
 * Memoizes the result across all components by using a simple LRU cache, with a
 * default size of 20. Set the default size by passing a `cacheLimit` argument.
 *
 * There's no need to ensure the params argument has a stable reference, UNLESS
 * you are supplying an object-style `background` prop for a gradient.
 *
 * Uses a `ResizeObserver` to keep in sync with the element.
 */
export declare const useBackgroundSquircle: <T extends Element>({ curveLength, roundness, stroke, strokeWidth, background, injectedDefs, injectedBody }: Omit<Types.SquircleOptionsSVG, "width" | "height">, ref: RefObject<T>, cacheLimit?: number) => {
    readonly background: ReturnType<typeof backgroundSquircle>;
};
//# sourceMappingURL=useBackgroundSquircle.d.ts.map