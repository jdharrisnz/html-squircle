(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clipSquircle = void 0;
    const utils_js_1 = require("./utils.js");
    /** Produces a squircle path to be used in `background-clip` inline styles. */
    const clipSquircle = ({ width, height, curveLength, roundness = 0.2 }) => `path('${(0, utils_js_1.getPath)(width, height, ...(0, utils_js_1.getCurveSpec)(width, height, curveLength, roundness))}')`;
    exports.clipSquircle = clipSquircle;
});
//# sourceMappingURL=clipSquircle.js.map