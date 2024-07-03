(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tag.js", "./utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.backgroundSquircle = void 0;
    const tag_js_1 = require("./tag.js");
    const utils_js_1 = require("./utils.js");
    /** Produces a URI-encoded squircle SVG to be used in `background` inline styles. */
    const backgroundSquircle = ({ width, height, curveLength, roundness = 0.2, stroke = "none", strokeWidth = 1, background = "#fff", injectedDefs = "", injectedBody = "" }) => {
        const [curveLengthShift, roundnessShift] = (0, utils_js_1.getCurveSpec)(width, height, curveLength, roundness);
        const d = (0, utils_js_1.getPath)(width, height, curveLengthShift, roundnessShift);
        const svg = encodeURIComponent((0, tag_js_1.tag)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: `${width}px`,
            height: `${height}px`
        }, (0, tag_js_1.tag)("defs", {}, (0, tag_js_1.tag)("path", { id: "path", d }), (0, tag_js_1.tag)("rect", { id: "rect", width: "100%", height: "100%" }), (0, tag_js_1.tag)("clipPath", { id: "clip" }, (0, tag_js_1.tag)("use", { href: `#path` })), (0, tag_js_1.tag)("mask", { id: "mask" }, (0, tag_js_1.tag)("use", { href: `#rect`, fill: "black" }), (0, tag_js_1.tag)("use", {
            href: `#path`,
            stroke: "#fff",
            "stroke-width": `${strokeWidth * 2}px`
        })), typeof background === "object"
            ? (0, tag_js_1.tag)("linearGradient", {
                id: "grad",
                gradientTransform: `rotate(${background.gradientAngle ?? 0} 0.5 0.5)`
            }, ...background.stops.map(({ offset, stopColor }) => (0, tag_js_1.tag)("stop", {
                offset,
                "stop-color": stopColor
            })))
            : background, injectedDefs), (0, tag_js_1.tag)("use", {
            href: `#path`,
            "clip-path": `url(#clip)`,
            fill: typeof background === "object" ? `url(#grad)` : background,
            stroke,
            "stroke-width": `${strokeWidth * 2}px`
        }), injectedBody));
        return `url("data:image/svg+xml,${svg}") left top no-repeat`;
    };
    exports.backgroundSquircle = backgroundSquircle;
});
//# sourceMappingURL=backgroundSquircle.js.map