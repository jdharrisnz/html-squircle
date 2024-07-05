import { useMemo } from "react"

import { clipSquircle } from "./clipSquircle.js"
import { useResizeObserver } from "./useResizeObserver.js"
import { LRUCache, serializeClipParams } from "./utils.js"

import type { RefObject } from "react"
import type { Types } from "./types.js"

/** @internal */
let cache: LRUCache<ReturnType<typeof clipSquircle>> | undefined

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
 * Compute a `clipSquircle` at the size of the `ref`'d element. The returned
 * object has a stable reference, so can be applied straight to the `style` prop
 * of your element.
 *
 * Memoizes the result across all components by using a simple LRU cache, with a
 * default size of 20. Set the default size by passing a `cacheLimit` argument.
 *
 * There's no need to ensure the params argument has a stable reference.
 *
 * Uses a `ResizeObserver` to keep in sync with the element.
 */
export const useClipSquircle = <T extends Element>(
  {
    curveLength,
    roundness
  }: Omit<Types.SquircleOptionsClip, "width" | "height">,
  ref: RefObject<T>,
  cacheCapacity?: number
): { readonly clipPath: ReturnType<typeof clipSquircle> } => {
  getCache().setCapacity(cacheCapacity)

  const { width, height } = useResizeObserver(ref)

  const cacheKey = useMemo(
    () =>
      serializeClipParams({
        width,
        height,
        curveLength,
        roundness
      }),
    [width, height, curveLength, roundness]
  )

  let clipPath = getCache().get(cacheKey)

  if (clipPath === undefined) {
    clipPath = clipSquircle({
      width,
      height,
      curveLength,
      roundness
    })
    getCache().set(cacheKey, clipPath)
  }

  return useMemo(
    () => ({
      clipPath
    }),
    [clipPath]
  )
}
