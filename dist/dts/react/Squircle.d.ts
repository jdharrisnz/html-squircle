import * as React from "react";
import type { GetAttributes, Types } from "../types.js";
export declare namespace Squircle {
    type Props<T extends Types.TagName> = GetAttributes<T> & {
        readonly as: T;
        readonly ref?: React.Ref<Types.TagNameMap[T]>;
        readonly squircle?: Types.SquircleOptionsClipReact | Types.SquircleOptionsBackgroundReact;
    };
}
/**
 * Polymorphic Squircle component for rendering a squircle where the size is
 * observed from the DOM element to which it is applied.
 *
 * @param as The name of a primitive element.
 * @param squircle (optional) The options to pass to the squircle computation
 *   function. You can prevent extra re-renders by passing a memoized value.
 */
export declare const Squircle: <T extends Types.TagName>({ as: Element, ref, squircle, style, children, ...restProps }: Squircle.Props<T>) => React.ReactNode;
//# sourceMappingURL=Squircle.d.ts.map