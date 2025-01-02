import { createContext, createElement, useContext, useState } from "react";
import { LRUCache } from "../utils/LRUCache.js";
const CacheContext = /*#__PURE__*/createContext(null);
export const useCache = () => useContext(CacheContext);
/**
 * Optional cache provider component for enabling global caching of computed
 * squircle values.
 */
export const CacheProvider = ({
  capacity = 20,
  children
}) => {
  const [cache] = useState(() => new LRUCache(capacity));
  cache.setCapacity(capacity);
  return createElement(CacheContext, {
    value: cache
  }, children);
};