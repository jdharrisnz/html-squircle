import { tag } from "./tag.js";
import { getCurveSpec, getPath } from "./utils.js";
/** Produces a URI-encoded squircle SVG to be used in `background` inline styles. */
export const backgroundSquircle = ({ width, height, curveLength, roundness = 0.2, stroke = "none", strokeWidth = 1, background = "#fff", injectedDefs = "", injectedBody = "" }) => {
    const [curveLengthShift, roundnessShift] = getCurveSpec(width, height, curveLength, roundness);
    const d = getPath(width, height, curveLengthShift, roundnessShift);
    const svg = encodeURIComponent(tag("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: `${width}px`,
        height: `${height}px`
    }, tag("defs", {}, tag("path", { id: "path", d }), tag("rect", { id: "rect", width: "100%", height: "100%" }), tag("clipPath", { id: "clip" }, tag("use", { href: `#path` })), tag("mask", { id: "mask" }, tag("use", { href: `#rect`, fill: "black" }), tag("use", {
        href: `#path`,
        stroke: "#fff",
        "stroke-width": `${strokeWidth * 2}px`
    })), typeof background === "object"
        ? tag("linearGradient", {
            id: "grad",
            gradientTransform: `rotate(${background.gradientAngle ?? 0} 0.5 0.5)`
        }, ...background.stops.map(({ offset, stopColor }) => tag("stop", {
            offset,
            "stop-color": stopColor
        })))
        : background, injectedDefs), tag("use", {
        href: `#path`,
        "clip-path": `url(#clip)`,
        fill: typeof background === "object" ? `url(#grad)` : background,
        stroke,
        "stroke-width": `${strokeWidth * 2}px`
    }), injectedBody));
    return `url("data:image/svg+xml,${svg}") left top no-repeat`;
};
//# sourceMappingURL=backgroundSquircle.js.map