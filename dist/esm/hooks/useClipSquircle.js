import { useMemo } from "react";
import { clipSquircle } from "../core/clipSquircle.js";
import { LRUCache, serializeClipParams } from "../utils/utils.js";
import { useResizeObserver } from "./useResizeObserver.js";
/** @internal */
let cache;
/**
 * Just helps TypeScript be smarter.
 *
 * @internal
 */
const getCache = () => {
    if (cache === undefined) {
        cache = new LRUCache(20);
    }
    return cache;
};
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
export const useClipSquircle = ({ curveLength, roundness }, { ref, deps, cacheCapacity }) => {
    getCache().setCapacity(cacheCapacity);
    const { width, height } = useResizeObserver(ref, deps);
    const cacheKey = useMemo(() => serializeClipParams({
        width,
        height,
        curveLength,
        roundness
    }), [width, height, curveLength, roundness]);
    let clipPath = getCache().get(cacheKey);
    if (clipPath === undefined) {
        clipPath = clipSquircle({
            width,
            height,
            curveLength,
            roundness
        });
        getCache().set(cacheKey, clipPath);
    }
    return useMemo(() => ({
        clipPath
    }), [clipPath]);
};
//# sourceMappingURL=useClipSquircle.js.map