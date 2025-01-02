import { useLayoutEffect, useReducer } from "react";
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
export const useResizeObserver = ref => {
  const [elementSize, resizeObserverCallback] = useReducer(resizeObserverReducer, initialState);
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
  return elementSize;
};