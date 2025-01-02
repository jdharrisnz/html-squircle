(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./CacheContext.js", "./Squircle.js", "./useBackgroundSquircle.js", "./useClipSquircle.js", "./useSquircle.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useSquircle = exports.useClipSquircle = exports.useBackgroundSquircle = exports.Squircle = exports.CacheProvider = void 0;
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
  var useBackgroundSquircle_js_1 = require("./useBackgroundSquircle.js");
  Object.defineProperty(exports, "useBackgroundSquircle", {
    enumerable: true,
    get: function () {
      return useBackgroundSquircle_js_1.useBackgroundSquircle;
    }
  });
  var useClipSquircle_js_1 = require("./useClipSquircle.js");
  Object.defineProperty(exports, "useClipSquircle", {
    enumerable: true,
    get: function () {
      return useClipSquircle_js_1.useClipSquircle;
    }
  });
  var useSquircle_js_1 = require("./useSquircle.js");
  Object.defineProperty(exports, "useSquircle", {
    enumerable: true,
    get: function () {
      return useSquircle_js_1.useSquircle;
    }
  });
});