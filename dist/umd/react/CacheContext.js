(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "../utils/LRUCache.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CacheProvider = exports.useCache = void 0;
  const react_1 = require("react");
  const LRUCache_js_1 = require("../utils/LRUCache.js");
  const CacheContext = (0, react_1.createContext)(null);
  const useCache = () => (0, react_1.useContext)(CacheContext);
  exports.useCache = useCache;
  /**
   * Optional cache provider component for enabling global caching of computed
   * squircle values.
   */
  const CacheProvider = ({
    capacity = 20,
    children
  }) => {
    const [cache] = (0, react_1.useState)(() => new LRUCache_js_1.LRUCache(capacity));
    cache.setCapacity(capacity);
    return (0, react_1.createElement)(CacheContext, {
      value: cache
    }, children);
  };
  exports.CacheProvider = CacheProvider;
});