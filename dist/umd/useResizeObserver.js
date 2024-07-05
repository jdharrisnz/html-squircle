(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useResizeObserver = void 0;
    const react_1 = require("react");
    /** @internal */
    const sizeReducer = (currentState, entries) => entries.reduce((acc, { target: { scrollWidth, scrollHeight } }) => {
        // Round pixels to avoid overly-frequent re-renders
        const width = Math.round(scrollWidth);
        const height = Math.round(scrollHeight);
        // Don't update state if the result is the same
        return width === acc.width && height === acc.height
            ? acc
            : {
                width,
                height
            };
    }, currentState);
    /** @internal */
    const initialState = {
        width: 0,
        height: 0
    };
    /** @internal */
    const useResizeObserver = (ref) => {
        const [size, callback] = (0, react_1.useReducer)(sizeReducer, initialState);
        // No dependencies as we want to re-run on every render
        (0, react_1.useLayoutEffect)(() => {
            if (!ref.current) {
                return undefined;
            }
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return () => {
                observer.disconnect();
            };
        });
        return size;
    };
    exports.useResizeObserver = useResizeObserver;
});
//# sourceMappingURL=useResizeObserver.js.map