import { createElement, useLayoutEffect, useMemo, useReducer } from "react";
import { eitherSquircleObj } from "../core/eitherSquircle.js";
import { sortAndSerialize } from "../utils/sortAndSerialize.js";
import { useCache } from "./CacheContext.js";
const resizeObserverEntryReducer = (currentState, {
  target: {
    scrollWidth,
    scrollHeight
  }
}) => {
  const {
    width: currentWidth,
    height: currentHeight
  } = currentState;
  // Round pixels to avoid overly-frequent re-renders
  const width = Math.round(scrollWidth);
  const height = Math.round(scrollHeight);
  // Don't update state if the result is the same
  return width === currentWidth && height === currentHeight ? currentState : {
    width,
    height
  };
};
const resizeObserverSizeReducer = (currentState, entries) => entries.reduce(resizeObserverEntryReducer, currentState);
const initialResizeObserverState = {
  width: 0,
  height: 0
};
/**
 * Polymorphic Squircle component for rendering a squircle where the size is
 * observed from the DOM element to which it is applied.
 *
 * @param as The name of a primitive element, or a function component.
 * @param props The props to pass to the component in the `as` parameter. Must
 *   include a ref to apply to the element.
 *
 *   To render children, do it in the usual JSX way, not via the `children` key.
 * @param squircle The options to pass to the squircle computation function. You
 *   can prevent extra re-renders by passing a memoized value.
 */
export const Squircle = ({
  as,
  props: {
    ref,
    style,
    ...restProps
  },
  squircle,
  children
}) => {
  // State for observed element size
  const [elementSize, resizeObserverCallback] = useReducer(resizeObserverSizeReducer, initialResizeObserverState);
  // Set up a ResizeObserver for the element
  useLayoutEffect(() => {
    if (!ref.current) {
      return undefined;
    }
    const observer = new ResizeObserver(resizeObserverCallback);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  // Get the cache if provided
  const cache = useCache();
  // Memoize the squircle style result
  const squircleStyle = useMemo(() => {
    // Add observed element size to the size-less props
    const config = {
      ...squircle,
      ...elementSize
    };
    // If no cache provided, just compute result
    if (!cache) {
      return eitherSquircleObj(config);
    }
    // Compute cache key
    const cacheKey = sortAndSerialize(config);
    // Get from cache
    const cached = cache.get(cacheKey) ?? eitherSquircleObj(config);
    // Set in cache
    cache.set(cacheKey, cached);
    return cached;
  }, [cache, elementSize, squircle]);
  return createElement(as, {
    ref,
    style: {
      ...style,
      ...squircleStyle
    },
    ...restProps
  }, children);
};