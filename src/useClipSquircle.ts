import { useCallback, useState } from "react"

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

/** @internal */
interface InternalState {
  readonly style: {
    readonly clipPath: ReturnType<typeof clipSquircle>
  }
  readonly lastNonZeroSize: {
    readonly width: number
    readonly height: number
  }
}

/** @internal */
const initialState: InternalState = {
  style: { clipPath: "path('')" },
  lastNonZeroSize: {
    width: 0,
    height: 0
  }
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

  const [{ style }, setState] = useState(initialState)

  const resizeCallback = useCallback(
    (entries: readonly ResizeObserverEntry[]) => {
      setState((currentState) =>
        // There should only be one entry, but I still need to safely reduce
        entries.reduce<InternalState>(
          (
            { lastNonZeroSize: { width: nonZeroWidth, height: nonZeroHeight } },
            { target: { scrollWidth, scrollHeight } }
          ): InternalState => {
            /**
             * When the `ref`'d element is removed from the DOM without the host
             * component being unmounted, the `ResizeObserver` will run the
             * callback with zero as the measured size. When it's added back to
             * the DOM, the `ResizeObserver` won't run the callback, so the size
             * stays zero. This guards against that by keeping the last non-zero
             * size.
             */
            const [width, height] =
              scrollWidth > 0 && scrollHeight > 0
                ? [scrollWidth, scrollHeight]
                : [nonZeroWidth, nonZeroHeight]

            const params: Types.SquircleOptionsClip = {
              width,
              height,
              curveLength,
              roundness
            }

            const key = serializeClipParams(params)
            let path = getCache().get(key)

            if (path === undefined) {
              path = clipSquircle(params)
              getCache().set(key, path)
            }

            return {
              style: {
                clipPath: path
              },
              lastNonZeroSize: {
                width,
                height
              }
            }
          },
          currentState
        )
      )
    },
    [curveLength, roundness]
  )

  useResizeObserver(resizeCallback, ref)

  return style
}
