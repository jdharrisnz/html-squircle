(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = /*#__PURE__*/factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "react"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useResizeObserver = void 0;
  const react_1 = require("react");
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
  const resizeObserverReducer = (currentState, entries) => entries.reduce(resizeObserverEntryReducer, currentState);
  const initialState = {
    width: 0,
    height: 0
  };
  const useResizeObserver = ref => {
    const [elementSize, resizeObserverCallback] = (0, react_1.useReducer)(resizeObserverReducer, initialState);
    (0, react_1.useLayoutEffect)(() => {
      if (!ref.current) {
        return undefined;
      }
      const observer = new ResizeObserver(resizeObserverCallback);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);
    return elementSize;
  };
  exports.useResizeObserver = useResizeObserver;
});