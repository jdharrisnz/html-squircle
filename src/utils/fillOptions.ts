import type { SquircleOptionsBackground } from "../types.js"

/**
 * Returns a new object with all Background options, filled by the input,
 * ordered, and restricted only to Background options.
 */
export const fillOptions = ({
  width = 0,
  height = 0,
  curveLength = 0,
  roundness = 0,
  stroke = "",
  strokeWidth = 0,
  background = "",
  injectedDefs = "",
  injectedBody = "",
}: Partial<SquircleOptionsBackground>): SquircleOptionsBackground => ({
  width,
  height,
  curveLength,
  roundness,
  stroke,
  strokeWidth,
  background,
  injectedDefs,
  injectedBody,
})
