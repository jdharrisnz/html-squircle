import { backgroundSquircle } from "../core/backgroundSquircle.js";
import type { Types } from "../types.js";
/**
 * Compute a `backgroundSquircle` at the size of the `ref`'d element. The
 * returned object has a stable reference, so can be applied straight to the
 * `style` prop of your element.
 *
 * There's no need to ensure the params argument has a stable reference, UNLESS
 * you are supplying an object-style `background` prop for a gradient.
 *
 * Use the `deps` option to provide dependencies to the underlying
 * `ResizeObserver` effect. This should be any state which could cause the
 * element to be removed from or added to the DOM, excluding component
 * unmounting. If you're unsure, don't use the option - it's just an
 * optimisation to prevent unnecessary runs of the `useEffect` function.
 *
 * Memoizes the result across all components by using a simple LRU cache, with a
 * default size of 20. Set the default size by using the `cacheCapacity`
 * option.
 */
export declare const useBackgroundSquircle: <T extends Element>({ curveLength, roundness, stroke, strokeWidth, background, injectedDefs, injectedBody }: Omit<Types.SquircleOptionsSVG, "width" | "height">, { ref, deps, cacheCapacity }: Types.HookOptions<T>) => {
    readonly background: ReturnType<typeof backgroundSquircle>;
};
//# sourceMappingURL=useBackgroundSquircle.d.ts.map