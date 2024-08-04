import { clipSquircle } from "../core/clipSquircle.js";
import type { Types } from "../types.js";
/**
 * Compute a `clipSquircle` at the size of the `ref`'d element. The returned
 * object has a stable reference, so can be applied straight to the `style` prop
 * of your element.
 *
 * There's no need to ensure the params argument has a stable reference.
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
export declare const useClipSquircle: <T extends Element>({ curveLength, roundness }: Omit<Types.SquircleOptionsClip, "width" | "height">, { ref, deps, cacheCapacity }: Types.HookOptions<T>) => {
    readonly clipPath: ReturnType<typeof clipSquircle>;
};
//# sourceMappingURL=useClipSquircle.d.ts.map