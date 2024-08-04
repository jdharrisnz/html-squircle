import { useMemo } from "react"

import { backgroundSquircle } from "./backgroundSquircle.js"
import { useResizeObserver } from "./useResizeObserver.js"
import { LRUCache, serializeBackgroundParams } from "./utils.js"

import type { RefObject } from "react"
import type { Types } from "./types.js"

/** @internal */
let cache: LRUCache<ReturnType<typeof backgroundSquircle>> | undefined

/**
 * Just helps TypeScript be smarter.
 *
 * @internal
 */
const getCache = () => {
  if (cache === undefined) {
    cache = new LRUCache(20)
  }

  return cache
}

/**
 * Compute a `backgroundSquircle` at the size of the `ref`'d element. The
 * returned object has a stable reference, so can be applied straight to the
 * `style` prop of your element.
 *
 * Memoizes the result across all components by using a simple LRU cache, with a
 * default size of 20. Set the default size by passing a `cacheLimit` argument.
 *
 * There's no need to ensure the params argument has a stable reference, UNLESS
 * you are supplying an object-style `background` prop for a gradient.
 *
 * Uses a `ResizeObserver` to keep in sync with the element.
 */
export const useBackgroundSquircle = <T extends Element>(
  {
    curveLength,
    roundness,
    stroke,
    strokeWidth,
    background: backgroundParam,
    injectedDefs,
    injectedBody
  }: Omit<Types.SquircleOptionsSVG, "width" | "height">,
  ref: RefObject<T>,
  cacheLimit?: number
): { readonly background: ReturnType<typeof backgroundSquircle> } => {
  getCache().setCapacity(cacheLimit)

  const { width, height } = useResizeObserver(ref)

  const cacheKey = useMemo(
    () =>
      serializeBackgroundParams({
        width,
        height,
        curveLength,
        roundness,
        stroke,
        strokeWidth,
        background: backgroundParam,
        injectedDefs,
        injectedBody
      }),
    [
      width,
      height,
      curveLength,
      roundness,
      stroke,
      strokeWidth,
      backgroundParam,
      injectedDefs,
      injectedBody
    ]
  )

  let background = getCache().get(cacheKey)

  if (background === undefined) {
    background = backgroundSquircle({
      width,
      height,
      curveLength,
      roundness,
      stroke,
      strokeWidth,
      background: backgroundParam,
      injectedDefs,
      injectedBody
    })
    getCache().set(cacheKey, background)
  }

  return useMemo(
    () => ({
      background
    }),
    [background]
  )
}
