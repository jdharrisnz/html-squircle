(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./clamp.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getCurveSpec = void 0;
  const clamp_js_1 = require("./clamp.js");
  /** Get the pixels shifts for curve length and roundness. */
  const getCurveSpec = (width, height, curveLength, roundness) => {
    const shortestSide = Math.min(width, height);
    // Matches Apple app icons when square
    const defaultCurveLength = 5 / 16 * shortestSide;
    const minCurveLength = 0;
    const maxCurveLength = shortestSide / 2;
    const curveLengthShift = (0, clamp_js_1.clamp)(curveLength ?? defaultCurveLength, minCurveLength, maxCurveLength);
    const roundnessShift = curveLengthShift * (0, clamp_js_1.clamp)(roundness, -1, 1);
    return [curveLengthShift, roundnessShift];
  };
  exports.getCurveSpec = getCurveSpec;
});