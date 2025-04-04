import * as React from "react"

import { LRUCache } from "../utils/LRUCache.js"

const CacheContext = React.createContext<LRUCache<
  | { readonly clipPath: `path('${string}')` }
  | {
      readonly background: `url("data:image/svg+xml,${string}") left top no-repeat`
    }
> | null>(null)

export const useCache = () => React.useContext(CacheContext)

export declare namespace CacheProvider {
  interface Props {
    readonly capacity?: number | undefined
    readonly children?: React.ReactNode | undefined
  }
}

/**
 * Optional cache provider component for enabling global caching of computed
 * squircle values.
 */
export const CacheProvider = ({
  capacity = 20,
  children,
}: CacheProvider.Props): React.JSX.Element => {
  const [cache] = React.useState(
    () =>
      new LRUCache<
        | { readonly clipPath: `path('${string}')` }
        | {
            readonly background: `url("data:image/svg+xml,${string}") left top no-repeat`
          }
      >(capacity),
  )
  cache.setCapacity(capacity)

  return <CacheContext value={cache}>{children}</CacheContext>
}
