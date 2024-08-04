(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "../core/backgroundSquircle.js", "../utils/utils.js", "./useResizeObserver.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useBackgroundSquircle = void 0;
    const react_1 = require("react");
    const backgroundSquircle_js_1 = require("../core/backgroundSquircle.js");
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
    const useBackgroundSquircle = ({ curveLength, roundness, stroke, strokeWidth, background, injectedDefs, injectedBody }, { ref, deps, cacheCapacity }) => {
        getCache().setCapacity(cacheCapacity);
        const { width, height } = (0, useResizeObserver_js_1.useResizeObserver)(ref, deps);
        const cacheKey = (0, react_1.useMemo)(() => (0, utils_js_1.serializeBackgroundParams)({
            width,
            height,
            curveLength,
            roundness,
            stroke,
            strokeWidth,
            background,
            injectedDefs,
            injectedBody
        }), [
            width,
            height,
            curveLength,
            roundness,
            stroke,
            strokeWidth,
            background,
            injectedDefs,
            injectedBody
        ]);
        let result = getCache().get(cacheKey);
        if (result === undefined) {
            result = (0, backgroundSquircle_js_1.backgroundSquircle)({
                width,
                height,
                curveLength,
                roundness,
                stroke,
                strokeWidth,
                background,
                injectedDefs,
                injectedBody
            });
            getCache().set(cacheKey, result);
        }
        return (0, react_1.useMemo)(() => ({
            background: result
        }), [result]);
    };
    exports.useBackgroundSquircle = useBackgroundSquircle;
});
//# sourceMappingURL=useBackgroundSquircle.js.map