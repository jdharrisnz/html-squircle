import * as React from "react";
import { isFunction } from "../utils/isFunction.js";
import { useSquircle } from "./useSquircle.js";
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
  const squircleStyle = useSquircle(refObject, squircle);
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