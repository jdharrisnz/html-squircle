import { backgroundSquircleObj } from "./backgroundSquircle.js"
import { clipSquircleObj } from "./clipSquircle.js"

import type { Types } from "../types.js"

type OptionsSvgKeys = Exclude<
  keyof Types.SquircleOptionsBackground,
  keyof Types.SquircleOptionsClip
>

const isOptionsSVG = (
  opts: Types.SquircleOptionsClip | Types.SquircleOptionsBackground,
): opts is Types.SquircleOptionsBackground =>
  ("stroke" satisfies OptionsSvgKeys) in opts ||
  ("strokeWidth" satisfies OptionsSvgKeys) in opts ||
  ("background" satisfies OptionsSvgKeys) in opts ||
  ("injectedDefs" satisfies OptionsSvgKeys) in opts ||
  ("injectedBody" satisfies OptionsSvgKeys) in opts

/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(
  options: Types.SquircleOptionsBackground,
): ReturnType<typeof backgroundSquircleObj>
export function eitherSquircleObj(
  options: Types.SquircleOptionsClip,
): ReturnType<typeof clipSquircleObj>
export function eitherSquircleObj(
  options: Types.SquircleOptionsClip | Types.SquircleOptionsBackground,
):
  | ReturnType<typeof clipSquircleObj>
  | ReturnType<typeof backgroundSquircleObj> {
  return isOptionsSVG(options) ?
      backgroundSquircleObj(options)
    : clipSquircleObj(options)
}
