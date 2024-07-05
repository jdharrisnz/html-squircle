(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeBackgroundParams = exports.serializeClipParams = exports.LRUCache = exports.getSerialId = exports.getCurveSpec = exports.getPath = void 0;
    /**
     * Get squircle SVG path.
     *
     * @internal
     */
    const getPath = (width, height, cShift, rShift) => 
    // Curve runs clockwise
    [
        // Start at top left pre-curve
        ...["M", 0, height - cShift],
        // Curve to top left post-curve
        ...["C", 0, height - rShift, rShift, height, cShift, height],
        // Line to top right pre-curve
        ...["L", width - cShift, height],
        // Curve to top right post-curve
        ...[
            "C",
            width - rShift,
            height,
            width,
            height - rShift,
            width,
            height - cShift
        ],
        // Line to bottom right pre-curve
        ...["L", width, cShift],
        // Curve to bottom right post-curve
        ...["C", width, rShift, width - rShift, 0, width - cShift, 0],
        // Line to bottom left pre-curve
        ...["L", cShift, 0],
        // Curve to bottom left post-curve
        ...["C", rShift, 0, 0, rShift, 0, cShift],
        // Close the path
        "Z"
    ].join(" ");
    exports.getPath = getPath;
    /** @internal */
    const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
    /**
     * Get the pixels shifts for curve length and roundness.
     *
     * @internal
     */
    const getCurveSpec = (width, height, curveLength, roundness) => {
        const shortestSide = Math.min(width, height);
        // Matches Apple app icons when square
        const defaultCurveLength = (5 / 16) * shortestSide;
        const minCurveLength = 0;
        const maxCurveLength = shortestSide / 2;
        const curveLengthShift = clamp(curveLength ?? defaultCurveLength, minCurveLength, maxCurveLength);
        const roundnessShift = curveLengthShift * clamp(roundness, -1, 1);
        return [curveLengthShift, roundnessShift];
    };
    exports.getCurveSpec = getCurveSpec;
    /** @internal */
    let serialId = 0;
    /** @internal */
    const getSerialId = () => {
        serialId += 1;
        return `i${serialId - 1}`;
    };
    exports.getSerialId = getSerialId;
    /** @internal */
    class LRUCache {
        cache;
        capacity;
        constructor(capacity) {
            this.cache = new Map();
            this.capacity = capacity;
        }
        prune() {
            // Oldest keys are first in the list
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }
        get(key) {
            if (!this.cache.has(key)) {
                return undefined;
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const value = this.cache.get(key);
            // Reset the position
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        set(key, value) {
            // Immediately delete in case it already exists
            // so that setting corrects the position
            this.cache.delete(key);
            this.cache.set(key, value);
            // Prune if necessary
            if (this.cache.size > this.capacity) {
                this.prune();
            }
        }
        setCapacity(capacity) {
            if (typeof capacity === "number" && capacity !== this.capacity) {
                this.capacity = Math.max(capacity, 1);
                while (this.capacity < this.cache.size) {
                    this.prune();
                }
            }
        }
    }
    exports.LRUCache = LRUCache;
    /** @internal */
    const sortEntryByKey = ([a], [b]) => {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    };
    /** @internal */
    const sortAndSerialize = (input) => typeof input === "object"
        ? Object.entries(input)
            .sort(sortEntryByKey)
            .map(([key, value]) => [key, sortAndSerialize(value)].join(":"))
            .join(";")
        : `${input}`;
    /**
     * Needed so the serialize function has all keys.
     *
     * @internal
     */
    const clipParams = {
        width: 0,
        height: 0,
        curveLength: 0,
        roundness: 0
    };
    /** @internal */
    const serializeClipParams = (params) => sortAndSerialize({
        ...clipParams,
        ...params
    });
    exports.serializeClipParams = serializeClipParams;
    /**
     * Needed so the serialize function has all keys.
     *
     * @internal
     */
    const backgroundParams = {
        ...clipParams,
        stroke: "",
        strokeWidth: 0,
        background: "",
        injectedDefs: "",
        injectedBody: ""
    };
    /** @internal */
    const serializeBackgroundParams = (params) => 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    sortAndSerialize({
        /**
         * The combination of unions for the `background` key isn't quite right but
         * the actual implementation is ok.
         */
        ...backgroundParams,
        ...params
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
    exports.serializeBackgroundParams = serializeBackgroundParams;
});
//# sourceMappingURL=utils.js.map