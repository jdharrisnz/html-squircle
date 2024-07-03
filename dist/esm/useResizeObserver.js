import { useEffect } from "react";
/** @internal */
export const useResizeObserver = (callback, ref) => {
    useEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        const observer = new ResizeObserver(callback);
        observer.observe(current);
        return () => {
            observer.unobserve(current);
        };
    }, [callback, ref]);
};
//# sourceMappingURL=useResizeObserver.js.map