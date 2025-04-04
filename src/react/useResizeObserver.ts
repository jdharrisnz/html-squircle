import { useLayoutEffect, useReducer } from "react"

import type { RefObject } from "react"

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
    : { width, height }
}

const resizeObserverReducer = (
  currentState: Size,
  entries: readonly ResizeObserverEntry[],
): Size => entries.reduce(resizeObserverEntryReducer, currentState)

const initialState: Size = {
  width: 0,
  height: 0,
}

export const useResizeObserver = (ref: RefObject<Element | null>): Size => {
  const [elementSize, resizeObserverCallback] = useReducer(
    resizeObserverReducer,
    initialState,
  )

  useLayoutEffect(() => {
    if (!ref.current) {
      return undefined
    }

    const observer = new ResizeObserver(resizeObserverCallback)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return elementSize
}
