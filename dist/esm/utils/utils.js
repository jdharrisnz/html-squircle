/**
 * Get squircle SVG path.
 *
 * @internal
 */
export const getPath = (width, height, cShift, rShift) => 
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
/** @internal */
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
/**
 * Get the pixels shifts for curve length and roundness.
 *
 * @internal
 */
export const getCurveSpec = (width, height, curveLength, roundness) => {
    const shortestSide = Math.min(width, height);
    // Matches Apple app icons when square
    const defaultCurveLength = (5 / 16) * shortestSide;
    const minCurveLength = 0;
    const maxCurveLength = shortestSide / 2;
    const curveLengthShift = clamp(curveLength ?? defaultCurveLength, minCurveLength, maxCurveLength);
    const roundnessShift = curveLengthShift * clamp(roundness, -1, 1);
    return [curveLengthShift, roundnessShift];
};
/** @internal */
export class LRUCache {
    cache;
    capacity;
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    prune() {
        // Oldest keys are first in the list
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey !== undefined) {
            this.cache.delete(oldestKey);
        }
    }
    get(key) {
        if (!this.cache.has(key)) {
            return undefined;
        }
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
export const serializeClipParams = (params) => sortAndSerialize({
    ...clipParams,
    ...params
});
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
export const serializeBackgroundParams = (params) => sortAndSerialize({
    /**
     * The combination of unions for the `background` key isn't quite right but
     * the actual implementation is ok.
     */
    ...backgroundParams,
    ...params
});
//# sourceMappingURL=utils.js.map