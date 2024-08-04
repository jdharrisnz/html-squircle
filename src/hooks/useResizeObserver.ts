import { useLayoutEffect, useReducer } from "react"

import type { RefObject } from "react"

interface Size {
  readonly width: number
  readonly height: number
}

/** @internal */
const sizeReducer = (
  currentState: Size,
  entries: readonly ResizeObserverEntry[]
): Size =>
  entries.reduce<Size>((acc, { target: { scrollWidth, scrollHeight } }) => {
    // Round pixels to avoid overly-frequent re-renders
    const width = Math.round(scrollWidth)
    const height = Math.round(scrollHeight)

    // Don't update state if the result is the same
    return width === acc.width && height === acc.height
      ? acc
      : {
          width,
          height
        }
  }, currentState)

/** @internal */
const initialState: Size = {
  width: 0,
  height: 0
}

/** @internal */
export const useResizeObserver = <T extends Element>(
  ref: RefObject<T>
): Size => {
  const [size, callback] = useReducer(sizeReducer, initialState)

  // No dependencies as we want to re-run on every render
  useLayoutEffect(() => {
    if (!ref.current) {
      return undefined
    }

    const observer = new ResizeObserver(callback)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  })

  return size
}
