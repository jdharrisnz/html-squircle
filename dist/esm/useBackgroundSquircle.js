import { useCallback, useState } from "react";
import { backgroundSquircle } from "./backgroundSquircle.js";
import { useResizeObserver } from "./useResizeObserver.js";
import { LRUCache, serializeBackgroundParams } from "./utils.js";
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
/** @internal */
const initialState = {
    style: { background: 'url("data:image/svg+xml,") left top no-repeat' },
    lastNonZeroSize: {
        width: 0,
        height: 0
    }
};
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
export const useBackgroundSquircle = ({ curveLength, roundness, stroke, strokeWidth, background, injectedDefs, injectedBody }, ref, cacheLimit) => {
    getCache().setCapacity(cacheLimit);
    const [{ style }, setState] = useState(initialState);
    const resizeCallback = useCallback((entries) => {
        setState((currentState) => 
        // There should only be one entry, but I still need to safely reduce
        entries.reduce(({ lastNonZeroSize: { width: nonZeroWidth, height: nonZeroHeight } }, { target: { scrollWidth, scrollHeight } }) => {
            /**
             * When the `ref`'d element is removed from the DOM without the host
             * component being unmounted, the `ResizeObserver` will run the
             * callback with zero as the measured size. When it's added back to
             * the DOM, the `ResizeObserver` won't run the callback, so the size
             * stays zero. This guards against that by keeping the last non-zero
             * size.
             */
            const [width, height] = scrollWidth > 0 && scrollHeight > 0
                ? [scrollWidth, scrollHeight]
                : [nonZeroWidth, nonZeroHeight];
            const params = {
                width,
                height,
                curveLength,
                roundness,
                stroke,
                strokeWidth,
                background,
                injectedDefs,
                injectedBody
            };
            const key = serializeBackgroundParams(params);
            let svg = getCache().get(key);
            if (svg === undefined) {
                svg = backgroundSquircle(params);
                getCache().set(key, svg);
            }
            return {
                style: {
                    background: svg
                },
                lastNonZeroSize: {
                    width,
                    height
                }
            };
        }, currentState));
    }, [
        curveLength,
        roundness,
        stroke,
        strokeWidth,
        background,
        injectedDefs,
        injectedBody
    ]);
    useResizeObserver(resizeCallback, ref);
    return style;
};
//# sourceMappingURL=useBackgroundSquircle.js.map