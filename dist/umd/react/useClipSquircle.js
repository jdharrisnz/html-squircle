(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "../core/clipSquircle.js", "../utils/sortAndSerialize.js", "./CacheContext.js", "./useResizeObserver.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useClipSquircle = void 0;
  const react_1 = require("react");
  const clipSquircle_js_1 = require("../core/clipSquircle.js");
  const sortAndSerialize_js_1 = require("../utils/sortAndSerialize.js");
  const CacheContext_js_1 = require("./CacheContext.js");
  const useResizeObserver_js_1 = require("./useResizeObserver.js");
  /**
   * Pass a ref for the observed element and options for the squircle computation
   * function.
   *
   * Note this will NOT work properly if you apply the style to an element your
   * component manages which may leave the DOM without your component unmounting.
   * Apply it only to elements which will be rendered unconditionally with your
   * component.
   */
  const useClipSquircle = (ref, options) => {
    // Observe the size
    const size = (0, useResizeObserver_js_1.useResizeObserver)(ref);
    // Get the cache if provided
    const cache = (0, CacheContext_js_1.useCache)();
    // Memoize the result
    const clipSquircle = (0, react_1.useMemo)(() => {
      // Add observed size to the size-less props
      const config = {
        ...options,
        ...size
      };
      // If no cache provided, just compute result
      if (!cache) {
        return (0, clipSquircle_js_1.clipSquircleObj)(config);
      }
      // Compute cache key
      const cacheKey = (0, sortAndSerialize_js_1.sortAndSerialize)(config);
      // Get from cache
      const cached = cache.get(cacheKey) ?? (0, clipSquircle_js_1.clipSquircleObj)(config);
      // Set in cache
      if (!cache.has(cacheKey)) {
        cache.set(cacheKey, cached);
      }
      return cached;
    }, [cache, options, size]);
    return clipSquircle;
  };
  exports.useClipSquircle = useClipSquircle;
});