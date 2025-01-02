(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./CacheContext.js", "./Squircle.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Squircle = exports.CacheProvider = void 0;
  var CacheContext_js_1 = require("./CacheContext.js");
  Object.defineProperty(exports, "CacheProvider", {
    enumerable: true,
    get: function () {
      return CacheContext_js_1.CacheProvider;
    }
  });
  var Squircle_js_1 = require("./Squircle.js");
  Object.defineProperty(exports, "Squircle", {
    enumerable: true,
    get: function () {
      return Squircle_js_1.Squircle;
    }
  });
});