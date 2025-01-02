import * as React from "react"

import { eitherSquircleObj } from "../core/eitherSquircle.js"
import { isFunction } from "../utils/isFunction.js"
import { sortAndSerialize } from "../utils/sortAndSerialize.js"
import { useCache } from "./CacheContext.js"

import type { GetAttributes, Types } from "../types.js"

interface Size {
  readonly width: number
  readonly height: number
}

const resizeObserverEntryReducer = (
  currentState: Size,
  { target: { scrollWidth, scrollHeight } }: ResizeObserverEntry,
): Size => {
  const { width: currentWidth, height: currentHeight } = currentState

  // Round pixels to avoid overly-frequent re-renders
  const width = Math.round(scrollWidth)
  const height = Math.round(scrollHeight)

  // Don't update state if the result is the same
  return width === currentWidth && height === currentHeight ?
      currentState
    : {
        width,
        height,
      }
}

const resizeObserverSizeReducer = (
  currentState: Size,
  entries: readonly ResizeObserverEntry[],
): Size => entries.reduce(resizeObserverEntryReducer, currentState)

const initialResizeObserverState: Size = {
  width: 0,
  height: 0,
}

export declare namespace Squircle {
  type Props<T extends Types.TagName> = GetAttributes<T> & {
    readonly as: T
    readonly ref?: React.Ref<Types.TagNameMap[T]>
    readonly squircle?:
      | Types.SquircleOptionsClipReact
      | Types.SquircleOptionsBackgroundReact
  }
}

/**
 * Polymorphic Squircle component for rendering a squircle where the size is
 * observed from the DOM element to which it is applied.
 *
 * @param as The name of a primitive element.
 * @param squircle (optional) The options to pass to the squircle computation
 *   function. You can prevent extra re-renders by passing a memoized value.
 */
export const Squircle = <T extends Types.TagName>({
  as: Element,
  ref,
  squircle,
  style,
  children,
  ...restProps
}: Squircle.Props<T>): React.ReactNode => {
  // Create our own object-style ref so that we can observe the size
  const refObject = React.useRef<Types.TagNameMap[T]>(null)

  // Merge the (possibly-) provided ref and the above one
  const mergedRef: React.RefCallback<Types.TagNameMap[T]> = (instance) => {
    // Assign our object-style ref
    refObject.current = instance

    // Run their callback-style ref and return its cleanup
    if (isFunction(ref)) {
      return ref(instance)
    }

    // Assign their object-style ref
    if (ref) {
      ref.current = instance
    }
  }

  // State for observed element size
  const [elementSize, resizeObserverCallback] = React.useReducer(
    resizeObserverSizeReducer,
    initialResizeObserverState,
  )

  // Set up a ResizeObserver for the element
  React.useLayoutEffect(() => {
    if (!refObject.current) {
      return undefined
    }

    const observer = new ResizeObserver(resizeObserverCallback)

    observer.observe(refObject.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  // Get the cache if provided
  const cache = useCache()

  // Memoize the squircle style result
  const squircleStyle = React.useMemo(() => {
    // Add observed element size to the size-less props
    const config: Types.SquircleOptionsClip | Types.SquircleOptionsBackground =
      {
        ...squircle,
        ...elementSize,
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
  }, [cache, elementSize, squircle])

  return (
    // @ts-expect-error Too much complexity
    <Element
      // @ts-expect-error Too much complexity
      ref={mergedRef}
      style={{
        ...style,
        ...squircleStyle,
      }}
      {...restProps}
    >
      {children}
    </Element>
  )
}
