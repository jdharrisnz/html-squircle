(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("eslint-config-terser-no-domprops/vars")) : typeof define === "function" && define.amd ? define(["exports", "eslint-config-terser-no-domprops/vars"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["bg-squircle"] = {}, global.vars));
})(this, function(exports2, vars) {
  "use strict";
  const getCurveSpec = (width, height, curveLength, curveSharpness) => {
    const shortestSide = vars.$ref_Math[vars.$prop_min](width, height);
    const curveLengthShift = shortestSide * vars.$ref_Math[vars.$prop_min](0.5, vars.$ref_Math[vars.$prop_max](0, curveLength));
    const curveSharpnessShift = curveLengthShift * curveSharpness;
    return [curveLengthShift, curveSharpnessShift];
  };
  const getPath = (width, height, curveLengthShift, curveSharpnessShift) => [
    "M",
    0,
    height - curveLengthShift,
    "C",
    0,
    height + curveSharpnessShift,
    -curveSharpnessShift,
    height,
    curveLengthShift,
    height,
    "L",
    width - curveLengthShift,
    height,
    "C",
    width + curveSharpnessShift,
    height,
    width,
    height + curveSharpnessShift,
    width,
    height - curveLengthShift,
    "L",
    width,
    curveLengthShift,
    "C",
    width,
    -curveSharpnessShift,
    width + curveSharpnessShift,
    0,
    width - curveLengthShift,
    0,
    "L",
    curveLengthShift,
    0,
    "C",
    -curveSharpnessShift,
    0,
    0,
    -curveSharpnessShift,
    0,
    curveLengthShift,
    "Z"
  ][vars.$prop_join](" ");
  const newSquirclers = ({
    curveLength: defaultCurveLength = 5 / 16,
    curveSharpness: defaultCurveSharpness = -0.2,
    svgBackground: defaultSvgBackground = "#fff",
    svgStroke: defaultSvgStroke = "none",
    svgStrokeWidth: defaultSvgStrokeWidth = 1
  } = {}) => [
    ({
      bgWidth,
      bgHeight,
      curveLength = defaultCurveLength,
      curveSharpness = defaultCurveSharpness
    }) => {
      const [curveLengthShift, curveSharpnessShift] = getCurveSpec(
        bgWidth,
        bgHeight,
        curveLength,
        curveSharpness
      );
      return `path('${getPath(bgWidth, bgHeight, curveLengthShift, curveSharpnessShift)}')`;
    },
    ({
      bgWidth,
      bgHeight,
      curveLength = defaultCurveLength,
      curveSharpness = defaultCurveSharpness,
      svgBackground = defaultSvgBackground,
      svgStroke = defaultSvgStroke,
      svgStrokeWidth = defaultSvgStrokeWidth
    }) => {
      const [curveLengthShift, curveSharpnessShift] = getCurveSpec(
        bgWidth,
        bgHeight,
        curveLength,
        curveSharpness
      );
      const d = getPath(bgWidth, bgHeight, curveLengthShift, curveSharpnessShift);
      const isStroked = svgStroke !== "none" && svgStrokeWidth !== 0;
      const clipId = isStroked ? `i${vars.$ref_Math[vars.$prop_random]()}` : "";
      const clip = isStroked ? `<clipPath id='${clipId}'><path d='${d}'/></clipPath>` : "";
      const isGradient = typeof svgBackground === "object";
      const gradientId = isGradient ? `i${vars.$ref_Math[vars.$prop_random]()}` : "";
      const gradient = isGradient ? `<linearGradient id='${gradientId}' gradientTransform='rotate(${svgBackground.gradientAngle ?? 0})'>${svgBackground.stops[vars.$prop_map](
        (stop) => `<stop offset='${stop.stopOffset}' stop-color='${stop.gradientColor}' />`
      )[vars.$prop_join]("")}</linearGradient>` : "";
      const defs = `<defs>${clip}${gradient}</defs>`;
      const applyClip = isStroked ? `clip-path='url(#${clipId})'` : "";
      const applyFill = `fill='${isGradient ? `url(#${gradientId})` : svgBackground}'`;
      const applyStroke = isStroked ? `stroke='${svgStroke}' stroke-width='${svgStrokeWidth * 2}px'` : "";
      const path = `<path ${applyClip} ${applyFill} ${applyStroke} d='${d}'/>`;
      const svg = `<svg width='${bgWidth}px' height='${bgHeight}px' xmlns='http://www.w3.org/2000/svg'>${defs}${path}</svg>`;
      const encodedSvg = vars.$ref_encodeURIComponent(svg);
      return `url("data:image/svg+xml,${encodedSvg}") left top no-repeat`;
    }
  ];
  const [clipSquircle, bgSquircle] = newSquirclers();
  exports2.bgSquircle = bgSquircle;
  exports2.clipSquircle = clipSquircle;
  exports2.newSquirclers = newSquirclers;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
