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
    const useResizeObserver = (callback, ref) => {
        (0, react_1.useEffect)(() => {
            const { current } = ref;
            if (!current)
                return;
            const observer = new ResizeObserver(callback);
            observer.observe(current);
            return () => {
                observer.unobserve(current);
            };
        }, [callback, ref]);
    };
    exports.useResizeObserver = useResizeObserver;
});
//# sourceMappingURL=useResizeObserver.js.map