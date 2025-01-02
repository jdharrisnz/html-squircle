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
  exports.LRUCache = void 0;
  class LRUCache {
    cache;
    capacity;
    constructor(capacity) {
      this.cache = new Map();
      this.capacity = Math.max(capacity, 1);
    }
    get(key) {
      const value = this.cache.get(key);
      if (value === undefined) {
        return undefined;
      }
      // Reset the position
      this.cache.set(key, value);
      return value;
    }
    set(key, value) {
      /** Delete in case it already exists so that setting corrects the position */
      this.cache.delete(key);
      this.cache.set(key, value);
      // Prune if necessary
      if (this.cache.size > this.capacity) {
        this.prune();
      }
    }
    setCapacity(capacity) {
      if (capacity !== undefined && capacity !== this.capacity) {
        this.capacity = Math.max(capacity, 1);
        while (this.capacity < this.cache.size) {
          this.prune();
        }
      }
    }
    prune() {
      // Oldest keys are first in the list
      for (const [key] of this.cache) {
        this.cache.delete(key);
        return;
      }
    }
  }
  exports.LRUCache = LRUCache;
});