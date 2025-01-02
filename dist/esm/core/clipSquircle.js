import { getCurveSpec } from "../utils/getCurveSpec.js";
import { getPath } from "../utils/getPath.js";
/** Produces a squircle path to be used in `background-clip` inline styles. */
export const clipSquircle = ({
  width,
  height,
  curveLength,
  roundness = 0.2
}) => `path('${getPath(width, height, ...getCurveSpec(width, height, curveLength, roundness))}')`;
/** Same as {@link clipSquircle}, but wrapped in an object. */
export const clipSquircleObj = options => ({
  clipPath: clipSquircle(options)
});