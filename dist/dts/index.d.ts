export type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
export type Attributes = Readonly<Record<string, string | number | true>>;
export type Children = readonly string[];
export type InjectionFunction = (hooks: {
    /**
     * The path id that can be used inside a `use` element.
     *
     * ```js
     * tag("use", { href: `#${pathId}` })
     * ```
     *
     * Use it to hook into the generated path, which has `d` pre-filled.
     */
    readonly pathId: `i${number}`;
    /**
     * The rect id that can be used inside a `use` element.
     *
     * ```js
     * tag("use", { href: `#${pathId}` })
     * ```
     *
     * Use it to hook into the generated rect, which has simply `width` and
     * `height` 100%.
     */
    readonly rectId: `i${number}`;
    /**
     * The clip id that can be used as a `clip-path` attribute.
     *
     * ```js
     * tag("rect", { "clip-path": `url(#${clipId})` })
     * ```
     *
     * Use it to clip an element to the generated path.
     */
    readonly clipId: `i${number}`;
    /**
     * The mask id that can be used as a `mask` attribute.
     *
     * ```js
     * tag("rect", { mask: `url(#${maskId})` })
     * ```
     *
     * Use it to mask an element by the supplied `stroke-width` of the path.
     */
    readonly maskId: `i${number}`;
    /**
     * The gradient id that can be used in a `fill` attribute.
     *
     * ```js
     * tag("rect", { fill: `url(#${maskId})` })
     * ```
     */
    readonly gradientId: `i${number}` | "";
}) => string;
export interface GradientStop {
    /** Percentage number. */
    readonly offset: number;
    /** Color string. */
    readonly stopColor: string;
}
export interface SquircleOptionsSVG {
    /** Width of the element the style will be applied to. */
    readonly width: number;
    /** Height of the element the style will be applied to. */
    readonly height: number;
    /**
     * Length of the curve in pixels.
     *
     * Minimum is zero, maximum is half the length of the shortest side.
     *
     * In SVG terms, affects the position of the points where the curves begin and
     * end.
     *
     * Default: Calculated according to the shortest of width or height to provide
     * curves like Apple app icons.
     */
    readonly curveLength?: number | undefined;
    /**
     * How smoothly the curve should take the corner, expressed as a fraction of
     * the `curveLength`. Positive numbers mean smoother, negative numbers mean
     * sharper.
     *
     * Minimum -1, maximum 1. Values below -0.3 usually result in right angles.
     *
     * In SVG terms, affects the length of the curve's control handles.
     *
     * @default
     *
     * 0.2
     */
    readonly roundness?: number | undefined;
    /**
     * Stroke color string.
     *
     * If you aren't specifying this, you should probably be using the function
     * for `clip-path` instead.
     *
     * @default
     *
     * "none"
     */
    readonly stroke?: string | undefined;
    /**
     * Width of the stroke in pixels. This is drawn on the inside of the image.
     *
     * @default
     *
     * 1
     */
    readonly strokeWidth?: number | undefined;
    /**
     * Spec for the background. Pass a color string for a solid background, or an
     * angle and an array of stops for a linear gradient.
     *
     * @default
     *
     * "#fff"
     */
    readonly background?: string | {
        /** Angle of the gradient in degrees. */
        readonly gradientAngle?: number;
        /** Color stops for the gradient. Provide at least two. */
        readonly stops: readonly [GradientStop, GradientStop, ...GradientStop[]];
    } | undefined;
    /**
     * Element(s) to insert into the <defs /> tag.
     *
     * When you need to use quote marks, use single quotes.
     *
     * Supply a `string` or an {@link InjectionFunction} to get access to the inner
     * ids of the SVG.
     *
     * @default
     *
     * ""
     */
    readonly injectedDefs?: string | InjectionFunction | undefined;
    /**
     * Element(s) to insert into the SVG body.
     *
     * When you need to use quote marks, use single quotes.
     *
     * Supply a `string` or an {@link InjectionFunction} to get access to the inner
     * ids of the SVG.
     *
     * @default
     *
     * ""
     */
    readonly injectedBody?: string | InjectionFunction | undefined;
}
export type SquircleOptionsClip = Omit<SquircleOptionsSVG, "stroke" | "strokeWidth" | "background" | "injectedDefs" | "injectedBody">;
export declare const tag: <T extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap, C extends string[]>(tagName: T, attributes: Readonly<Record<string, string | number | boolean>>, ...children: C) => string;
/** Produces a squircle path to be used in `background-clip` inline styles. */
export declare const clipSquircle: ({ width, height, curveLength, roundness }: SquircleOptionsClip) => `path('${string}')`;
/** Produces a URI-encoded squircle SVG to be used in `background` inline styles. */
export declare const backgroundSquircle: ({ width, height, curveLength, roundness, stroke, strokeWidth, background, injectedDefs, injectedBody }: SquircleOptionsSVG) => `url("data:image/svg+xml,${string}") left top no-repeat`;
//# sourceMappingURL=index.d.ts.map