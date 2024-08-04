(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "../core/clipSquircle.js", "../utils/utils.js", "./useResizeObserver.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useClipSquircle = void 0;
    const react_1 = require("react");
    const clipSquircle_js_1 = require("../core/clipSquircle.js");
    const utils_js_1 = require("../utils/utils.js");
    const useResizeObserver_js_1 = require("./useResizeObserver.js");
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
    const useClipSquircle = ({ curveLength, roundness }, { ref, deps, cacheCapacity }) => {
        getCache().setCapacity(cacheCapacity);
        const { width, height } = (0, useResizeObserver_js_1.useResizeObserver)(ref, deps);
        const cacheKey = (0, react_1.useMemo)(() => (0, utils_js_1.serializeClipParams)({
            width,
            height,
            curveLength,
            roundness
        }), [width, height, curveLength, roundness]);
        let clipPath = getCache().get(cacheKey);
        if (clipPath === undefined) {
            clipPath = (0, clipSquircle_js_1.clipSquircle)({
                width,
                height,
                curveLength,
                roundness
            });
            getCache().set(cacheKey, clipPath);
        }
        return (0, react_1.useMemo)(() => ({
            clipPath
        }), [clipPath]);
    };
    exports.useClipSquircle = useClipSquircle;
});
//# sourceMappingURL=useClipSquircle.js.map