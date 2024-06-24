/** @internal */
const handleEntry = ([key, value]) => (value === true ? ` ${key}` : ` ${key}='${value}'`);
export const tag = (tagName, attributes, ...children) => `<${tagName}${Object.entries(attributes)
    .map(handleEntry)
    .join("")}>${children.join("")}</${tagName}>`;
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
/** Produces a squircle path to be used in `background-clip` inline styles. */
export const clipSquircle = ({ width, height, curveLength, roundness = 0.2 }) => `path('${getPath(width, height, ...getCurveSpec(width, height, curveLength, roundness))}')`;
/** @internal */
let serialId = 0;
/** @internal */
const getSerialId = () => {
    serialId += 1;
    return `i${serialId - 1}`;
};
/** Produces a URI-encoded squircle SVG to be used in `background` inline styles. */
export const backgroundSquircle = ({ width, height, curveLength, roundness = 0.2, stroke = "none", strokeWidth = 1, background = "#fff", injectedDefs = "", injectedBody = "" }) => {
    const [curveLengthShift, roundnessShift] = getCurveSpec(width, height, curveLength, roundness);
    const d = getPath(width, height, curveLengthShift, roundnessShift);
    const pathId = getSerialId();
    const rectId = getSerialId();
    const clipId = getSerialId();
    const maskId = getSerialId();
    const isGradient = typeof background === "object";
    const gradientId = isGradient ? getSerialId() : "";
    const injectorArg = {
        pathId,
        rectId,
        clipId,
        maskId,
        gradientId
    };
    const svg = encodeURIComponent(tag("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: `${width}px`,
        height: `${height}px`
    }, tag("defs", {}, tag("path", { id: pathId, d }), tag("rect", { id: rectId, width: "100%", height: "100%" }), tag("clipPath", { id: clipId }, tag("use", { href: `#${pathId}` })), tag("mask", { id: maskId }, tag("use", { href: `#${rectId}`, fill: "black" }), tag("use", {
        href: `#${pathId}`,
        stroke: "#fff",
        "stroke-width": `${strokeWidth * 2}px`
    })), isGradient
        ? tag("linearGradient", {
            id: gradientId,
            gradientTransform: `rotate(${background.gradientAngle ?? 0} 0.5 0.5)`
        }, ...background.stops.map(({ offset, stopColor }) => tag("stop", {
            offset,
            "stop-color": stopColor
        })))
        : "", typeof injectedDefs === "function"
        ? injectedDefs(injectorArg)
        : injectedDefs), tag("use", {
        href: `#${pathId}`,
        "clip-path": `url(#${clipId})`,
        fill: isGradient ? `url(#${gradientId})` : background,
        stroke,
        "stroke-width": `${strokeWidth * 2}px`
    }), typeof injectedBody === "function"
        ? injectedBody(injectorArg)
        : injectedBody));
    return `url("data:image/svg+xml,${svg}") left top no-repeat`;
};
//# sourceMappingURL=index.js.map