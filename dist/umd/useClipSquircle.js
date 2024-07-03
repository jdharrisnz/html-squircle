(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./clipSquircle.js", "./useResizeObserver.js", "./utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useClipSquircle = void 0;
    const react_1 = require("react");
    const clipSquircle_js_1 = require("./clipSquircle.js");
    const useResizeObserver_js_1 = require("./useResizeObserver.js");
    const utils_js_1 = require("./utils.js");
    /** @internal */
    let cache;
    /**
     * Just helps TypeScript be smarter.
     *
     * @internal
     */
    const getCache = () => {
        if (cache === undefined) {
            cache = new utils_js_1.LRUCache(20);
        }
        return cache;
    };
    /** @internal */
    const initialState = {
        style: { clipPath: "path('')" },
        lastNonZeroSize: {
            width: 0,
            height: 0
        }
    };
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
    const useClipSquircle = ({ curveLength, roundness }, ref, cacheCapacity) => {
        getCache().setCapacity(cacheCapacity);
        const [{ style }, setState] = (0, react_1.useState)(initialState);
        const resizeCallback = (0, react_1.useCallback)((entries) => {
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
                    roundness
                };
                const key = (0, utils_js_1.serializeClipParams)(params);
                let path = getCache().get(key);
                if (path === undefined) {
                    path = (0, clipSquircle_js_1.clipSquircle)(params);
                    getCache().set(key, path);
                }
                return {
                    style: {
                        clipPath: path
                    },
                    lastNonZeroSize: {
                        width,
                        height
                    }
                };
            }, currentState));
        }, [curveLength, roundness]);
        (0, useResizeObserver_js_1.useResizeObserver)(resizeCallback, ref);
        return style;
    };
    exports.useClipSquircle = useClipSquircle;
});
//# sourceMappingURL=useClipSquircle.js.map