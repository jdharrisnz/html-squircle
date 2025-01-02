import { useMemo } from "react"

import { eitherSquircleObj } from "../core/eitherSquircle.js"
import { sortAndSerialize } from "../utils/sortAndSerialize.js"
import { useCache } from "./CacheContext.js"
import { useResizeObserver } from "./useResizeObserver.js"

import type { RefObject } from "react"

import type { backgroundSquircleObj } from "../core/backgroundSquircle.js"
import type { clipSquircleObj } from "../core/clipSquircle.js"
import type { Types } from "../types.js"

/**
 * Pass a ref for the observed element and options for the squircle computation
 * function. The returned type will depend on the options used.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export function useSquircle(
  ref: RefObject<Element | null>,
  options?: Types.SquircleOptionsClipReact,
): ReturnType<typeof clipSquircleObj>
/**
 * Pass a ref for the observed element and options for the squircle computation
 * function. The returned type will depend on the options used.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export function useSquircle(
  ref: RefObject<Element | null>,
  options?: Types.SquircleOptionsBackgroundReact,
): ReturnType<typeof backgroundSquircleObj>
/**
 * Pass a ref for the observed element and options for the squircle computation
 * function. The returned type will depend on the options used.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export function useSquircle(
  ref: RefObject<Element | null>,
  options?:
    | Types.SquircleOptionsClipReact
    | Types.SquircleOptionsBackgroundReact,
):
  | ReturnType<typeof clipSquircleObj>
  | ReturnType<typeof backgroundSquircleObj> {
  // Observe the size
  const size = useResizeObserver(ref)

  // Get the cache if provided
  const cache = useCache()

  // Memoize the result
  const squircle = useMemo(() => {
    // Add observed size to the size-less props
    const config: Types.SquircleOptionsBackground = {
      ...options,
      ...size,
    }

    // If no cache provided, just compute result
    if (!cache) {
      return eitherSquircleObj(config)
    }

    // Compute cache key
    const cacheKey = sortAndSerialize(config)

    // Get from cache
    const cached = cache.get(cacheKey) ?? eitherSquircleObj(config)

    // Set in cache
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, cached)
    }

    return cached
  }, [cache, options, size])

  return squircle
}
