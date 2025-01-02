(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./backgroundSquircle.js", "./clipSquircle.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.eitherSquircleObj = eitherSquircleObj;
  const backgroundSquircle_js_1 = require("./backgroundSquircle.js");
  const clipSquircle_js_1 = require("./clipSquircle.js");
  const isOptionsBackground = opts => "stroke" in opts || "strokeWidth" in opts || "background" in opts || "injectedDefs" in opts || "injectedBody" in opts;
  /**
   * Overloaded function for getting either the background or clip squircle
   * objects. Returns a result based on whether any background options are present
   * in the options object.
   */
  function eitherSquircleObj(options) {
    return isOptionsBackground(options) ? (0, backgroundSquircle_js_1.backgroundSquircleObj)(options) : (0, clipSquircle_js_1.clipSquircleObj)(options);
  }
});