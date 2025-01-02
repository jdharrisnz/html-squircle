import type { HTMLAttributes, SVGAttributes } from "react"

export type ReadonlyRecord<K extends PropertyKey, V> = Readonly<Record<K, V>>

export type GetAttributes<T extends Types.TagName> =
  T extends keyof HTMLElementTagNameMap ? HTMLAttributes<Types.TagNameMap[T]>
  : T extends keyof SVGElementTagNameMap ? SVGAttributes<Types.TagNameMap[T]>
  : never

export declare namespace Types {
  type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap

  interface TagNameMap
    extends HTMLElementTagNameMap,
      Omit<SVGElementTagNameMap, "a" | "style" | "script" | "title"> {}

  type Attributes = ReadonlyRecord<
    string,
    string | number | true | ReadonlyRecord<string, string>
  >

  type Children = readonly string[]

  type GradientStop = {
    /** Percentage number. */
    readonly offset: number

    /** Color string. */
    readonly stopColor: string
  }

  type SquircleSize = {
    /** Width of the element the style will be applied to. */
    readonly width: number

    /** Height of the element the style will be applied to. */
    readonly height: number
  }

  type SquircleOptionsClipReact = {
    /**
     * Length of the curve in pixels.
     *
     * Minimum is zero, maximum is half the length of the shortest side.
     *
     * In SVG terms, affects the position of the points where the curves begin
     * and end.
     *
     * Default: Calculated according to the shortest of width or height to
     * provide curves like Apple app icons.
     */
    readonly curveLength?: number | undefined

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
    readonly roundness?: number | undefined
  }

  type SquircleOptionsClip = SquircleSize & SquircleOptionsClipReact

  type SquircleOptionsBackgroundReact = SquircleOptionsClipReact & {
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
    readonly stroke?: string | undefined

    /**
     * Width of the stroke in pixels. This is drawn on the inside of the image.
     *
     * @default
     *
     * 1
     */
    readonly strokeWidth?: number | undefined

    /**
     * Spec for the background. Pass a color string for a solid background, or
     * an angle and an array of stops for a linear gradient.
     *
     * @default
     *
     * "#fff"
     */
    readonly background?:
      | string
      | {
          /** Angle of the gradient in degrees. */
          readonly gradientAngle?: number | undefined

          /** Color stops for the gradient. Provide at least two. */
          readonly stops: readonly [
            GradientStop,
            GradientStop,
            ...GradientStop[],
          ]
        }
      | undefined

    /**
     * Element(s) to insert into the `<defs />` tag.
     *
     * When you need to use quote marks inside the values, use single quotes.
     *
     * If you want to refer to the other elements in a `<use />` element, the
     * ids are:
     *
     * - `#path`
     * - `#rect`
     * - `#clip`
     * - `#mask`
     * - `#grad`
     *
     * @default
     *
     * ""
     */
    readonly injectedDefs?: string | undefined

    /**
     * Element(s) to insert into the SVG body.
     *
     * When you need to use quote marks inside the values, use single quotes.
     *
     * If you want to refer to the other elements in a `<use />` element, the
     * ids are:
     *
     * - `#path`
     * - `#rect`
     * - `#clip`
     * - `#mask`
     * - `#grad`
     *
     * @default
     *
     * ""
     */
    readonly injectedBody?: string | undefined
  }

  type SquircleOptionsBackground = SquircleSize & SquircleOptionsBackgroundReact
}
