(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getPath = void 0;
  /** Get squircle SVG path. */
  const getPath = (width, height, cShift, rShift) =>
  // Curve runs clockwise
  // Start at top left pre-curve
  `M 0 ${height - cShift} ` +
  // Curve to top left post-curve
  `C 0 ${height - rShift} ${rShift} ${height} ${cShift} ${height} ` +
  // Line to top right pre-curve
  `L ${width - cShift} ${height} ` +
  // Curve to top right post-curve
  `C ${width - rShift} ${height} ${width} ${height - rShift} ${width} ${height - cShift} ` +
  // Line to bottom right pre-curve
  `L ${width} ${cShift} ` +
  // Curve to bottom right post-curve
  `C ${width} ${rShift} ${width - rShift} 0 ${width - cShift} 0 ` +
  // Line to bottom left pre-curve
  `L ${cShift} 0 ` +
  // Curve to bottom left post-curve
  `C ${rShift} 0 0 ${rShift} 0 ${cShift} ` +
  // Close the path
  `Z`;
  exports.getPath = getPath;
});