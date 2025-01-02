(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./pickOptions.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sortAndSerialize = void 0;
  const pickOptions_js_1 = require("./pickOptions.js");
  const sortEntryByKey = ([a], [b]) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  const handleEntry = ([key, value]) => [key, sortAndSerializeOptions(value)].join(":");
  const sortAndSerializeOptions = input => typeof input === "object" ? Object.entries(input).sort(sortEntryByKey).map(handleEntry).join(";") : `${input}`;
  const sortAndSerialize = input => sortAndSerializeOptions((0, pickOptions_js_1.pickOptions)(input));
  exports.sortAndSerialize = sortAndSerialize;
});