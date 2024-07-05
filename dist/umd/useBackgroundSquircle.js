(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./backgroundSquircle.js", "./useResizeObserver.js", "./utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useBackgroundSquircle = void 0;
    const react_1 = require("react");
    const backgroundSquircle_js_1 = require("./backgroundSquircle.js");
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
    const useBackgroundSquircle = ({ curveLength, roundness, stroke, strokeWidth, background: backgroundParam, injectedDefs, injectedBody }, ref, cacheLimit) => {
        getCache().setCapacity(cacheLimit);
        const { width, height } = (0, useResizeObserver_js_1.useResizeObserver)(ref);
        const cacheKey = (0, react_1.useMemo)(() => (0, utils_js_1.serializeBackgroundParams)({
            width,
            height,
            curveLength,
            roundness,
            stroke,
            strokeWidth,
            background: backgroundParam,
            injectedDefs,
            injectedBody
        }), [
            width,
            height,
            curveLength,
            roundness,
            stroke,
            strokeWidth,
            backgroundParam,
            injectedDefs,
            injectedBody
        ]);
        let background = getCache().get(cacheKey);
        if (background === undefined) {
            background = (0, backgroundSquircle_js_1.backgroundSquircle)({
                width,
                height,
                curveLength,
                roundness,
                stroke,
                strokeWidth,
                background: backgroundParam,
                injectedDefs,
                injectedBody
            });
            getCache().set(cacheKey, background);
        }
        return (0, react_1.useMemo)(() => ({
            background
        }), [background]);
    };
    exports.useBackgroundSquircle = useBackgroundSquircle;
});
//# sourceMappingURL=useBackgroundSquircle.js.map