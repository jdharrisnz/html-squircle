import { getCurveSpec } from "../utils/getCurveSpec.js"
import { getPath } from "../utils/getPath.js"

import type { SquircleOptionsClip } from "../types.js"

/** Produces a squircle path to be used in `background-clip` inline styles. */
export const clipSquircle = ({
  width,
  height,
  curveLength,
  roundness = 0.2,
}: SquircleOptionsClip) =>
  `path('${getPath(width, height, ...getCurveSpec(width, height, curveLength, roundness))}')` as const

/** Same as {@link clipSquircle}, but wrapped in an object. */
export const clipSquircleObj = (options: SquircleOptionsClip) => ({
  clipPath: clipSquircle(options),
})
