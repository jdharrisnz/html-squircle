/* eslint-disable no-restricted-properties */
/* eslint-disable no-restricted-globals */
/* eslint-disable typescript-sort-keys/interface */
interface SquircleOptionalParams {
    /**
     * How long the curve should be, expressed as a fraction of the shortest side. Minimum zero,
     * maximum 0.5.
     *
     * In SVG, affects the position of the point where the curve begins.
     */
    curveLength?: number

    /**
     * How tightly the curve should take the corner, expressed as a fraction of the `curveLength`.
     * Positive numbers mean sharper, negative numbers mean smoother. Minimum -1, maximum 1. Values
     * above 0.3 usually result in right angles.
     *
     * In SVG, affects the length of the curve's control handle.
     */
    curveSharpness?: number

    /**
     * Spec for the background. Pass a color string for a solid background, or an angle and an array
     * of stops for a linear gradient.
     */
    svgBackground?:
        | string
        | {
              /** Angle of the gradient in degrees. */
              gradientAngle?: number
              stops: {
                  /** Percentage number. */
                  stopOffset: number

                  /** Color string. */
                  gradientColor: string
              }[]
          }

    /** Stroke color string. */
    svgStroke?: string

    /** Width of the stroke in pixels. */
    svgStrokeWidth?: number
}

interface SquircleParams extends SquircleOptionalParams {
    /** Width of the background in pixels. */
    bgWidth: number

    /** Height of the background in pixels. */
    bgHeight: number
}

type ClipSquircler = (
    params: Omit<SquircleParams, "svgBackground" | "svgStroke" | "svgStrokeWidth">
) => `path('${string}')`

type BackgroundSquircler = (
    params: SquircleParams
) => `url("data:image/svg+xml,${string}") left top no-repeat`

/**
 * To get a constant curve length, supply the result of this function to the `curveLength` parameter
 * of either of the squircle functions. This is subject to the minimum and maximum lengths that stop
 * the SVG from going wonky.
 *
 * This length is defined in pixels, but bear in mind the length of the squircle's curve is visually
 * quite different to `border-radius` from CSS, which you might be more used to.
 */
export const getConstantCurveLength = (pixelLength: number, width: number, height: number) =>
    pixelLength / Math.min(width, height)

const getCurveSpec = (
    width: number,
    height: number,
    curveLength: number,
    curveSharpness: number
): [number, number] => {
    const clamp = (value: number, minimum: number, maximum: number): number =>
        Math.min(maximum, Math.max(value, minimum))

    const shortestSide = Math.min(width, height)
    const curveLengthShift = shortestSide * clamp(curveLength, 0, 0.5)
    const curveSharpnessShift = curveLengthShift * clamp(curveSharpness, -1, 1)

    return [curveLengthShift, curveSharpnessShift]
}

const getPath = (
    width: number,
    height: number,
    curveLengthShift: number,
    curveSharpnessShift: number
): string =>
    [
        "M",
        0,
        height - curveLengthShift,

        "C",
        0,
        height + curveSharpnessShift,
        -curveSharpnessShift,
        height,
        curveLengthShift,
        height,

        "L",
        width - curveLengthShift,
        height,

        "C",
        width + curveSharpnessShift,
        height,
        width,
        height + curveSharpnessShift,
        width,
        height - curveLengthShift,

        "L",
        width,
        curveLengthShift,

        "C",
        width,
        -curveSharpnessShift,
        width + curveSharpnessShift,
        0,
        width - curveLengthShift,
        0,

        "L",
        curveLengthShift,
        0,

        "C",
        -curveSharpnessShift,
        0,
        0,
        -curveSharpnessShift,
        0,
        curveLengthShift,

        "Z"
    ].join(" ")

export const newClipSquircler =
    ({
        curveLength: defaultCurveLength = 5 / 16,
        curveSharpness: defaultCurveSharpness = -0.2
    }: Omit<
        SquircleOptionalParams,
        "svgBackground" | "svgStroke" | "svgStrokeWidth"
    > = {}): ClipSquircler =>
    ({
        bgWidth,
        bgHeight,
        curveLength = defaultCurveLength,
        curveSharpness = defaultCurveSharpness
    }) => {
        const [curveLengthShift, curveSharpnessShift] = getCurveSpec(
            bgWidth,
            bgHeight,
            curveLength,
            curveSharpness
        )

        return `path('${getPath(bgWidth, bgHeight, curveLengthShift, curveSharpnessShift)}')`
    }

export const newBgSquircler =
    ({
        curveLength: defaultCurveLength = 5 / 16,
        curveSharpness: defaultCurveSharpness = -0.2,
        svgBackground: defaultSvgBackground = "#fff",
        svgStroke: defaultSvgStroke = "none",
        svgStrokeWidth: defaultSvgStrokeWidth = 1
    }: SquircleOptionalParams = {}): BackgroundSquircler =>
    ({
        bgWidth,
        bgHeight,
        curveLength = defaultCurveLength,
        curveSharpness = defaultCurveSharpness,
        svgBackground = defaultSvgBackground,
        svgStroke = defaultSvgStroke,
        svgStrokeWidth = defaultSvgStrokeWidth
    }) => {
        const tag = (
            tagName: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
            attributes: Record<string, string | number>,
            ...children: string[]
        ): string =>
            `<${tagName}${Object.entries(attributes)
                .map(([key, value]) => ` ${key}='${value}'`)
                .join("")}>${children.join("")}</${tagName}>`

        const getId = (): `i${number}` => `i${Math.random()}`

        const [curveLengthShift, curveSharpnessShift] = getCurveSpec(
            bgWidth,
            bgHeight,
            curveLength,
            curveSharpness
        )

        const d = getPath(bgWidth, bgHeight, curveLengthShift, curveSharpnessShift)

        const isStroked = svgStroke !== "none" && svgStrokeWidth !== 0
        const clipId = isStroked ? getId() : ""

        const isGradient = typeof svgBackground === "object"
        const gradientId = isGradient ? getId() : ""

        const svg = tag(
            "svg",
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: `${bgWidth}px`,
                height: `${bgHeight}px`
            },
            tag(
                "defs",
                {},
                isStroked ? tag("clipPath", { id: clipId }, tag("path", { d })) : "",
                isGradient
                    ? tag(
                          "linearGradient",
                          {
                              id: gradientId,
                              gradientTransform: `rotate(${svgBackground.gradientAngle ?? 0})`
                          },
                          ...svgBackground.stops.map(({ stopOffset, gradientColor }) =>
                              tag("stop", { offset: stopOffset, "stop-color": gradientColor })
                          )
                      )
                    : ""
            ),
            tag("path", {
                ...(isStroked
                    ? {
                          "clip-path": `url(#${clipId})`,
                          stroke: svgStroke,
                          "stroke-width": `${svgStrokeWidth * 2}px`
                      }
                    : {}),
                fill: isGradient ? `url(#${gradientId})` : svgBackground,
                d
            })
        )

        const encodedSvg = encodeURIComponent(svg)

        return `url("data:image/svg+xml,${encodedSvg}") left top no-repeat`
    }

export const clipSquircle = newClipSquircler()

export const bgSquircle = newBgSquircler()
