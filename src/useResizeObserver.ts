import { useEffect } from "react"

import type { RefObject } from "react"

/** @internal */
export const useResizeObserver = <T extends Element>(
  callback: ResizeObserverCallback,
  ref: RefObject<T>
): void => {
  useEffect(() => {
    const { current } = ref

    if (!current) return

    const observer = new ResizeObserver(callback)
    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  }, [callback, ref])
}
