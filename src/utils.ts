import type { Types } from "./types.js"

/**
 * Get squircle SVG path.
 *
 * @internal
 */
export const getPath = (
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
export const getCurveSpec = (
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

/** @internal */
let serialId = 0

/** @internal */
export const getSerialId = (): `i${number}` => {
  serialId += 1
  return `i${serialId - 1}`
}

/** @internal */
export class LRUCache<T> {
  private readonly cache: Map<string, T>
  private capacity: number

  constructor(capacity: number) {
    this.cache = new Map()
    this.capacity = capacity
  }

  private prune() {
    // Oldest keys are first in the list
    const oldestKey: string | undefined = this.cache.keys().next().value
    if (oldestKey !== undefined) {
      this.cache.delete(oldestKey)
    }
  }

  public get(key: string): T | undefined {
    if (!this.cache.has(key)) return undefined

    const value = this.cache.get(key)!

    // Reset the position
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  public set(key: string, value: T): void {
    // Immediately delete in case it already exists
    // so that setting corrects the position
    this.cache.delete(key)
    this.cache.set(key, value)

    // Prune if necessary
    if (this.cache.size > this.capacity) {
      this.prune()
    }
  }

  public setCapacity(capacity: number | undefined): void {
    if (typeof capacity === "number" && capacity !== this.capacity) {
      this.capacity = Math.max(capacity, 1)
      while (this.capacity < this.cache.size) {
        this.prune()
      }
    }
  }
}

/** @internal */
type Sortable =
  | string
  | number
  | undefined
  | readonly Sortable[]
  | { readonly [x: string]: Sortable }

/** @internal */
const sortEntryByKey = (
  [a]: readonly [string, Sortable],
  [b]: readonly [string, Sortable]
): -1 | 0 | 1 => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

/** @internal */
const sortAndSerialize = (input: Sortable): string =>
  typeof input === "object"
    ? Object.entries(input)
        .sort(sortEntryByKey)
        .map(([key, value]) => [key, sortAndSerialize(value)].join(":"))
        .join(";")
    : `${input}`

/**
 * Needed so the serialize function has all keys.
 *
 * @internal
 */
const clipParams: Required<Types.SquircleOptionsClip> = {
  width: 0,
  height: 0,
  curveLength: 0,
  roundness: 0
}

/** @internal */
export const serializeClipParams = (
  params: Types.SquircleOptionsClip
): string =>
  sortAndSerialize({
    ...clipParams,
    ...params
  })

/**
 * Needed so the serialize function has all keys.
 *
 * @internal
 */
const backgroundParams: Types.SquircleOptionsSVG = {
  ...clipParams,
  stroke: "",
  strokeWidth: 0,
  background: "",
  injectedDefs: "",
  injectedBody: ""
}

/** @internal */
export const serializeBackgroundParams = (params: Types.SquircleOptionsSVG) =>
  sortAndSerialize({
    /**
     * The combination of unions for the `background` key isn't quite right but
     * the actual implementation is ok.
     */
    ...backgroundParams,
    ...params
  } as any)
