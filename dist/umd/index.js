(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./core/backgroundSquircle.js", "./core/clipSquircle.js", "./core/eitherSquircle.js", "./utils/tag.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tag = exports.eitherSquircleObj = exports.clipSquircleObj = exports.clipSquircle = exports.backgroundSquircleObj = exports.backgroundSquircle = void 0;
  var backgroundSquircle_js_1 = require("./core/backgroundSquircle.js");
  Object.defineProperty(exports, "backgroundSquircle", {
    enumerable: true,
    get: function () {
      return backgroundSquircle_js_1.backgroundSquircle;
    }
  });
  Object.defineProperty(exports, "backgroundSquircleObj", {
    enumerable: true,
    get: function () {
      return backgroundSquircle_js_1.backgroundSquircleObj;
    }
  });
  var clipSquircle_js_1 = require("./core/clipSquircle.js");
  Object.defineProperty(exports, "clipSquircle", {
    enumerable: true,
    get: function () {
      return clipSquircle_js_1.clipSquircle;
    }
  });
  Object.defineProperty(exports, "clipSquircleObj", {
    enumerable: true,
    get: function () {
      return clipSquircle_js_1.clipSquircleObj;
    }
  });
  var eitherSquircle_js_1 = require("./core/eitherSquircle.js");
  Object.defineProperty(exports, "eitherSquircleObj", {
    enumerable: true,
    get: function () {
      return eitherSquircle_js_1.eitherSquircleObj;
    }
  });
  var tag_js_1 = require("./utils/tag.js");
  Object.defineProperty(exports, "tag", {
    enumerable: true,
    get: function () {
      return tag_js_1.tag;
    }
  });
});