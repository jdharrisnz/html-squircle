import { backgroundSquircleObj } from "./backgroundSquircle.js"
import { clipSquircleObj } from "./clipSquircle.js"

import type { Types } from "../types.js"

type OptionsBackgroundKeys = Exclude<
  keyof Types.SquircleOptionsBackground,
  keyof Types.SquircleOptionsClip
>

const isOptionsBackground = (
  opts: Types.SquircleOptionsClip | Types.SquircleOptionsBackground,
): opts is Types.SquircleOptionsBackground =>
  ("stroke" satisfies OptionsBackgroundKeys) in opts ||
  ("strokeWidth" satisfies OptionsBackgroundKeys) in opts ||
  ("background" satisfies OptionsBackgroundKeys) in opts ||
  ("injectedDefs" satisfies OptionsBackgroundKeys) in opts ||
  ("injectedBody" satisfies OptionsBackgroundKeys) in opts

/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(
  options: Types.SquircleOptionsClip,
): ReturnType<typeof clipSquircleObj>
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(
  options: Types.SquircleOptionsBackground,
): ReturnType<typeof backgroundSquircleObj>
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(
  options: Types.SquircleOptionsClip | Types.SquircleOptionsBackground,
):
  | ReturnType<typeof clipSquircleObj>
  | ReturnType<typeof backgroundSquircleObj> {
  return isOptionsBackground(options) ?
      backgroundSquircleObj(options)
    : clipSquircleObj(options)
}
