import { backgroundSquircleObj } from "./backgroundSquircle.js"
import { clipSquircleObj } from "./clipSquircle.js"

import type {
  SquircleOptionsBackground,
  SquircleOptionsClip,
} from "../types.js"

type OptionsBackgroundKeys = Exclude<
  keyof SquircleOptionsBackground,
  keyof SquircleOptionsClip
>

const isOptionsBackground = (
  opts: SquircleOptionsClip | SquircleOptionsBackground,
): opts is SquircleOptionsBackground =>
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
export function eitherSquircleObj(options: SquircleOptionsClip): {
  clipPath: `path('${string}')`
}
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(options: SquircleOptionsBackground): {
  background: `url("data:image/svg+xml,${string}") left top no-repeat`
}
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(
  options: SquircleOptionsClip | SquircleOptionsBackground,
):
  | { clipPath: `path('${string}')` }
  | { background: `url("data:image/svg+xml,${string}") left top no-repeat` } {
  return isOptionsBackground(options) ?
      backgroundSquircleObj(options)
    : clipSquircleObj(options)
}
