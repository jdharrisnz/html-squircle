export type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap

export type Attributes = Readonly<Record<string, string | number | true>>

export type Children = readonly string[]

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
  readonly pathId: `i${number}`

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
  readonly rectId: `i${number}`

  /**
   * The clip id that can be used as a `clip-path` attribute.
   *
   * ```js
   * tag("rect", { "clip-path": `url(#${clipId})` })
   * ```
   *
   * Use it to clip an element to the generated path.
   */
  readonly clipId: `i${number}`

  /**
   * The mask id that can be used as a `mask` attribute.
   *
   * ```js
   * tag("rect", { mask: `url(#${maskId})` })
   * ```
   *
   * Use it to mask an element by the supplied `stroke-width` of the path.
   */
  readonly maskId: `i${number}`

  /**
   * The gradient id that can be used in a `fill` attribute.
   *
   * ```js
   * tag("rect", { fill: `url(#${maskId})` })
   * ```
   */
  readonly gradientId: `i${number}` | ""
}) => string

export interface GradientStop {
  /** Percentage number. */
  readonly offset: number

  /** Color string. */
  readonly stopColor: string
}

export interface SquircleOptionsSVG {
  /** Width of the element the style will be applied to. */
  readonly width: number

  /** Height of the element the style will be applied to. */
  readonly height: number

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
   * Spec for the background. Pass a color string for a solid background, or an
   * angle and an array of stops for a linear gradient.
   *
   * @default
   *
   * "#fff"
   */
  readonly background?:
    | string
    | {
        /** Angle of the gradient in degrees. */
        readonly gradientAngle?: number

        /** Color stops for the gradient. Provide at least two. */
        readonly stops: readonly [GradientStop, GradientStop, ...GradientStop[]]
      }
    | undefined

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
  readonly injectedDefs?: string | InjectionFunction | undefined

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
  readonly injectedBody?: string | InjectionFunction | undefined
}

export type SquircleOptionsClip = Omit<
  SquircleOptionsSVG,
  "stroke" | "strokeWidth" | "background" | "injectedDefs" | "injectedBody"
>

/** @internal */
const handleEntry = ([key, value]: readonly [
  string,
  string | number | boolean
]): string => (value === true ? ` ${key}` : ` ${key}='${value}'`)

export const tag = <
  T extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
  C extends string[]
>(
  tagName: T,
  attributes: Readonly<Record<string, string | number | boolean>>,
  ...children: C
): string =>
  `<${tagName}${Object.entries(attributes)
    .map(handleEntry)
    .join("")}>${children.join("")}</${tagName}>`

/**
 * Get squircle SVG path.
 *
 * @internal
 */
const getPath = (
  width: number,
  height: number,
  cShift: number,
  rShift: number
): string =>
  // Curve runs clockwise
  [
    // Start at top left pre-curve
    ...["M", 0, height - cShift],

    // Curve to top left post-curve
    ...["C", 0, height - rShift, rShift, height, cShift, height],

    // Line to top right pre-curve
    ...["L", width - cShift, height],

    // Curve to top right post-curve
    ...[
      "C",
      width - rShift,
      height,
      width,
      height - rShift,
      width,
      height - cShift
    ],

    // Line to bottom right pre-curve
    ...["L", width, cShift],

    // Curve to bottom right post-curve
    ...["C", width, rShift, width - rShift, 0, width - cShift, 0],

    // Line to bottom left pre-curve
    ...["L", cShift, 0],

    // Curve to bottom left post-curve
    ...["C", rShift, 0, 0, rShift, 0, cShift],

    // Close the path
    "Z"
  ].join(" ")

/** @internal */
const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value))

/**
 * Get the pixels shifts for curve length and roundness.
 *
 * @internal
 */
const getCurveSpec = (
  width: number,
  height: number,
  curveLength: number | undefined,
  roundness: number
): readonly [number, number] => {
  const shortestSide = Math.min(width, height)

  // Matches Apple app icons when square
  const defaultCurveLength = (5 / 16) * shortestSide
  const minCurveLength = 0
  const maxCurveLength = shortestSide / 2

  const curveLengthShift = clamp(
    curveLength ?? defaultCurveLength,
    minCurveLength,
    maxCurveLength
  )
  const roundnessShift = curveLengthShift * clamp(roundness, -1, 1)

  return [curveLengthShift, roundnessShift]
}

/** Produces a squircle path to be used in `background-clip` inline styles. */
export const clipSquircle = ({
  width,
  height,
  curveLength,
  roundness = 0.2
}: SquircleOptionsClip): `path('${string}')` =>
  `path('${getPath(width, height, ...getCurveSpec(width, height, curveLength, roundness))}')`

/** @internal */
let serialId = 0

/** @internal */
const getSerialId = (): `i${number}` => {
  serialId += 1
  return `i${serialId - 1}`
}

/** Produces a URI-encoded squircle SVG to be used in `background` inline styles. */
export const backgroundSquircle = ({
  width,
  height,
  curveLength,
  roundness = 0.2,
  stroke = "none",
  strokeWidth = 1,
  background = "#fff",
  injectedDefs = "",
  injectedBody = ""
}: SquircleOptionsSVG): `url("data:image/svg+xml,${string}") left top no-repeat` => {
  const [curveLengthShift, roundnessShift] = getCurveSpec(
    width,
    height,
    curveLength,
    roundness
  )

  const d = getPath(width, height, curveLengthShift, roundnessShift)

  const pathId = getSerialId()
  const rectId = getSerialId()
  const clipId = getSerialId()
  const maskId = getSerialId()
  const isGradient = typeof background === "object"
  const gradientId = isGradient ? getSerialId() : ("" as const)
  const injectorArg: Parameters<InjectionFunction>[0] = {
    pathId,
    rectId,
    clipId,
    maskId,
    gradientId
  }

  const svg = encodeURIComponent(
    tag(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: `${width}px`,
        height: `${height}px`
      },
      tag(
        "defs",
        {},
        tag("path", { id: pathId, d }),
        tag("rect", { id: rectId, width: "100%", height: "100%" }),
        tag("clipPath", { id: clipId }, tag("use", { href: `#${pathId}` })),
        tag(
          "mask",
          { id: maskId },
          tag("use", { href: `#${rectId}`, fill: "black" }),
          tag("use", {
            href: `#${pathId}`,
            stroke: "#fff",
            "stroke-width": `${strokeWidth * 2}px`
          })
        ),
        isGradient
          ? tag(
              "linearGradient",
              {
                id: gradientId,
                gradientTransform: `rotate(${background.gradientAngle ?? 0} 0.5 0.5)`
              },
              ...background.stops.map(({ offset, stopColor }) =>
                tag("stop", {
                  offset,
                  "stop-color": stopColor
                })
              )
            )
          : "",
        typeof injectedDefs === "function"
          ? injectedDefs(injectorArg)
          : injectedDefs
      ),
      tag("use", {
        href: `#${pathId}`,
        "clip-path": `url(#${clipId})`,
        fill: isGradient ? `url(#${gradientId})` : background,
        stroke,
        "stroke-width": `${strokeWidth * 2}px`
      }),
      typeof injectedBody === "function"
        ? injectedBody(injectorArg)
        : injectedBody
    )
  )

  return `url("data:image/svg+xml,${svg}") left top no-repeat`
}
