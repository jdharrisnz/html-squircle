import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from "react";
import type { Types } from "../types.js";
type RequireProps<P, E extends Types.TagName = Types.TagName> = Omit<P, "ref" | "style"> & {
    readonly ref: RefObject<(E extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[E] : E extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[E] : Element) | null>;
    readonly style?: CSSProperties;
    readonly children?: never;
};
export declare namespace Squircle {
    interface Props<T extends Types.TagName | ((props: any) => ReactNode)> {
        readonly as: T;
        readonly props: T extends Types.TagName ? RequireProps<HTMLAttributes<T>, T> : T extends (props: infer P) => ReactNode ? RequireProps<P> : undefined;
        readonly squircle?: Types.SquircleOptionsClipReact | Types.SquircleOptionsBackgroundReact;
        readonly children?: ReactNode | undefined;
    }
}
/**
 * Polymorphic Squircle component for rendering a squircle where the size is
 * observed from the DOM element to which it is applied.
 *
 * @param as The name of a primitive element, or a function component.
 * @param props The props to pass to the component in the `as` parameter. Must
 *   include a ref to apply to the element.
 *
 *   To render children, do it in the usual JSX way, not via the `children` key.
 * @param squircle The options to pass to the squircle computation function. You
 *   can prevent extra re-renders by passing a memoized value.
 */
export declare const Squircle: <T extends Types.TagName | ((props: any) => ReactNode)>({ as, props: { ref, style, ...restProps }, squircle, children, }: Squircle.Props<T>) => ReactNode;
export {};
//# sourceMappingURL=Squircle.d.ts.map