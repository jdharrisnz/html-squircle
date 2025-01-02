(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react", "../utils/isFunction.js", "./useSquircle.js"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Squircle = void 0;
  const React = require("react");
  const isFunction_js_1 = require("../utils/isFunction.js");
  const useSquircle_js_1 = require("./useSquircle.js");
  /**
   * Polymorphic Squircle component for rendering a squircle where the size is
   * observed from the DOM element to which it is applied.
   *
   * @param as The name of a primitive element.
   * @param squircle (optional) The options to pass to the squircle computation
   *   function. You can prevent extra re-renders by passing a memoized value.
   */
  const Squircle = ({
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
      if ((0, isFunction_js_1.isFunction)(ref)) {
        return ref(instance);
      }
      // Assign their object-style ref
      if (ref) {
        ref.current = instance;
      }
    };
    const squircleStyle = (0, useSquircle_js_1.useSquircle)(refObject, squircle);
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
  exports.Squircle = Squircle;
});