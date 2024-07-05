import { useLayoutEffect, useReducer } from "react";
/** @internal */
const sizeReducer = (currentState, entries) => entries.reduce((acc, { target: { scrollWidth, scrollHeight } }) => {
    // Round pixels to avoid overly-frequent re-renders
    const width = Math.round(scrollWidth);
    const height = Math.round(scrollHeight);
    // Don't update state if the result is the same
    return width === acc.width && height === acc.height
        ? acc
        : {
            width,
            height
        };
}, currentState);
/** @internal */
const initialState = {
    width: 0,
    height: 0
};
/** @internal */
export const useResizeObserver = (ref) => {
    const [size, callback] = useReducer(sizeReducer, initialState);
    // No dependencies as we want to re-run on every render
    useLayoutEffect(() => {
        if (!ref.current) {
            return undefined;
        }
        const observer = new ResizeObserver(callback);
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    });
    return size;
};
//# sourceMappingURL=useResizeObserver.js.map