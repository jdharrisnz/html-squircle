(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tag.js", "./backgroundSquircle.js", "./clipSquircle.js", "./useBackgroundSquircle.js", "./useClipSquircle.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useClipSquircle = exports.useBackgroundSquircle = exports.clipSquircle = exports.backgroundSquircle = exports.tag = void 0;
    var tag_js_1 = require("./tag.js");
    Object.defineProperty(exports, "tag", { enumerable: true, get: function () { return tag_js_1.tag; } });
    var backgroundSquircle_js_1 = require("./backgroundSquircle.js");
    Object.defineProperty(exports, "backgroundSquircle", { enumerable: true, get: function () { return backgroundSquircle_js_1.backgroundSquircle; } });
    var clipSquircle_js_1 = require("./clipSquircle.js");
    Object.defineProperty(exports, "clipSquircle", { enumerable: true, get: function () { return clipSquircle_js_1.clipSquircle; } });
    var useBackgroundSquircle_js_1 = require("./useBackgroundSquircle.js");
    Object.defineProperty(exports, "useBackgroundSquircle", { enumerable: true, get: function () { return useBackgroundSquircle_js_1.useBackgroundSquircle; } });
    var useClipSquircle_js_1 = require("./useClipSquircle.js");
    Object.defineProperty(exports, "useClipSquircle", { enumerable: true, get: function () { return useClipSquircle_js_1.useClipSquircle; } });
});
//# sourceMappingURL=index.js.map