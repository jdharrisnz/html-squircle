import { LRUCache } from "../utils/LRUCache.js";
import type { FunctionComponent, ReactNode } from "react";
import type { backgroundSquircle } from "../core/backgroundSquircle.js";
import type { clipSquircle } from "../core/clipSquircle.js";
export declare const useCache: () => LRUCache<{
    readonly clipPath: ReturnType<typeof clipSquircle>;
} | {
    readonly background: ReturnType<typeof backgroundSquircle>;
}> | null;
export declare namespace CacheProvider {
    interface Props {
        readonly capacity?: number | undefined;
        readonly children?: ReactNode | undefined;
    }
}
/**
 * Optional cache provider component for enabling global caching of computed
 * squircle values.
 */
export declare const CacheProvider: FunctionComponent<CacheProvider.Props>;
//# sourceMappingURL=CacheContext.d.ts.map