import { createContext, createElement, useContext, useState } from "react"

import { LRUCache } from "../utils/LRUCache.js"

import type { FunctionComponent, ReactNode } from "react"

import type { backgroundSquircle } from "../core/backgroundSquircle.js"
import type { clipSquircle } from "../core/clipSquircle.js"

const CacheContext = createContext<LRUCache<
  | { readonly clipPath: ReturnType<typeof clipSquircle> }
  | { readonly background: ReturnType<typeof backgroundSquircle> }
> | null>(null)

export const useCache = () => useContext(CacheContext)

export declare namespace CacheProvider {
  interface Props {
    readonly capacity?: number | undefined
    readonly children?: ReactNode | undefined
  }
}

/**
 * Optional cache provider component for enabling global caching of computed
 * squircle values.
 */
export const CacheProvider: FunctionComponent<CacheProvider.Props> = ({
  capacity = 20,
  children,
}) => {
  const [cache] = useState(
    () =>
      new LRUCache<
        | { readonly clipPath: ReturnType<typeof clipSquircle> }
        | { readonly background: ReturnType<typeof backgroundSquircle> }
      >(capacity),
  )
  cache.setCapacity(capacity)

  return createElement(CacheContext, { value: cache }, children)
}
