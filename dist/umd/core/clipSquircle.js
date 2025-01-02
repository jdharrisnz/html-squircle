(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "../utils/getCurveSpec.js", "../utils/getPath.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.clipSquircleObj = exports.clipSquircle = void 0;
  const getCurveSpec_js_1 = require("../utils/getCurveSpec.js");
  const getPath_js_1 = require("../utils/getPath.js");
  /** Produces a squircle path to be used in `background-clip` inline styles. */
  const clipSquircle = ({
    width,
    height,
    curveLength,
    roundness = 0.2
  }) => `path('${(0, getPath_js_1.getPath)(width, height, ...(0, getCurveSpec_js_1.getCurveSpec)(width, height, curveLength, roundness))}')`;
  exports.clipSquircle = clipSquircle;
  /** Same as {@link clipSquircle}, but wrapped in an object. */
  const clipSquircleObj = options => ({
    clipPath: (0, exports.clipSquircle)(options)
  });
  exports.clipSquircleObj = clipSquircleObj;
});