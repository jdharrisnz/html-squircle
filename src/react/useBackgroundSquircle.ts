import { useMemo } from "react"

import { backgroundSquircleObj } from "../core/backgroundSquircle.js"
import { sortAndSerialize } from "../utils/sortAndSerialize.js"
import { useCache } from "./CacheContext.js"
import { useResizeObserver } from "./useResizeObserver.js"

import type { RefObject } from "react"

import type {
  SquircleOptionsBackground,
  SquircleOptionsBackgroundReact,
} from "../types.js"

/**
 * Pass a ref for the observed element and options for the squircle computation
 * function.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export const useBackgroundSquircle = (
  ref: RefObject<Element | null>,
  options?: SquircleOptionsBackgroundReact,
): { background: `url("data:image/svg+xml,${string}") left top no-repeat` } => {
  // Observe the size
  const size = useResizeObserver(ref)

  // Get the cache if provided
  const cache = useCache()

  // Memoize the result
  const backgroundSquircle = useMemo(() => {
    // Add observed size to the size-less props
    const config: SquircleOptionsBackground = {
      ...options,
      ...size,
    }

    // If no cache provided, just compute the result
    if (!cache) {
      return backgroundSquircleObj(config)
    }

    // Compute the cache key
    const cacheKey = sortAndSerialize(config)

    // Get from cache
    const cached =
      (cache.get(cacheKey) as
        | ReturnType<typeof backgroundSquircleObj>
        | undefined) ?? backgroundSquircleObj(config)

    // Set in cache
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, cached)
    }

    return cached
  }, [cache, options, size])

  return backgroundSquircle
}
