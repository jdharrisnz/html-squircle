import { useLayoutEffect, useReducer } from "react";
/** @internal */
const entryReducer = (currentState, { target: { scrollWidth, scrollHeight } }) => {
    // Round pixels to avoid overly-frequent re-renders
    const width = Math.round(scrollWidth);
    const height = Math.round(scrollHeight);
    // Don't update state if the result is the same
    return width === currentState.width && height === currentState.height
        ? currentState
        : {
            width,
            height
        };
};
/** @internal */
const sizeReducer = (currentState, entries) => entries.reduce(entryReducer, currentState);
/** @internal */
const initialState = {
    width: 0,
    height: 0
};
/** @internal */
export const useResizeObserver = (ref, dependencies) => {
    const [size, callback] = useReducer(sizeReducer, initialState);
    const deps = dependencies && [ref, ...dependencies];
    useLayoutEffect(() => {
        if (!ref.current) {
            return undefined;
        }
        const observer = new ResizeObserver(callback);
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return size;
};
//# sourceMappingURL=useResizeObserver.js.map