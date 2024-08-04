import { Types } from "../types.js"
import { getCurveSpec, getPath } from "../utils/utils.js"

/** Produces a squircle path to be used in `background-clip` inline styles. */
export const clipSquircle = ({
  width,
  height,
  curveLength,
  roundness = 0.2
}: Types.SquircleOptionsClip): `path('${string}')` =>
  `path('${getPath(width, height, ...getCurveSpec(width, height, curveLength, roundness))}')`
