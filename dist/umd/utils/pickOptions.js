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
  exports.pickOptions = void 0;
  const optionKeys = ["width", "height", "curveLength", "roundness", "stroke", "strokeWidth", "background", "injectedDefs", "injectedBody"];
  /**
   * Returns a new object with all SVG options, filled by the input, ordered, and
   * restricted only to SVG options. Default value undefined.
   */
  const pickOptions = input => {
    const out = {};
    for (const key of optionKeys) {
      if (key in input) {
        // @ts-expect-error Doesn't refine and can't handle the union of values
        out[key] = input[key];
      } else {
        out[key] = undefined;
      }
    }
    return out;
  };
  exports.pickOptions = pickOptions;
});