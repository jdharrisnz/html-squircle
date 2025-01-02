import * as React from "react";
import { eitherSquircleObj } from "../core/eitherSquircle.js";
import { isFunction } from "../utils/isFunction.js";
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
 * @param as The name of a primitive element.
 * @param squircle (optional) The options to pass to the squircle computation
 *   function. You can prevent extra re-renders by passing a memoized value.
 */
export const Squircle = ({
  as: Element,
  ref,
  squircle,
  style,
  children,
  ...restProps
}) => {
  // Create our own object-style ref so that we can observe the size
  const refObject = React.useRef(null);
  // Merge the (possibly-) provided ref and the above one
  const mergedRef = instance => {
    // Assign our object-style ref
    refObject.current = instance;
    // Run their callback-style ref and return its cleanup
    if (isFunction(ref)) {
      return ref(instance);
    }
    // Assign their object-style ref
    if (ref) {
      ref.current = instance;
    }
  };
  // State for observed element size
  const [elementSize, resizeObserverCallback] = React.useReducer(resizeObserverSizeReducer, initialResizeObserverState);
  // Set up a ResizeObserver for the element
  React.useLayoutEffect(() => {
    if (!refObject.current) {
      return undefined;
    }
    const observer = new ResizeObserver(resizeObserverCallback);
    observer.observe(refObject.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  // Get the cache if provided
  const cache = useCache();
  // Memoize the squircle style result
  const squircleStyle = React.useMemo(() => {
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
  return (
    // @ts-expect-error Too much complexity
    React.createElement(Element
    // @ts-expect-error Too much complexity
    , {
      // @ts-expect-error Too much complexity
      ref: mergedRef,
      style: {
        ...style,
        ...squircleStyle
      },
      ...restProps
    }, children)
  );
};