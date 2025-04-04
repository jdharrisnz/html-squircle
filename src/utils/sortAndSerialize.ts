import { fillOptions } from "./fillOptions.js"
import { isObject } from "./isObject.js"

import type { SquircleOptionsClip } from "../types.js"

type Sortable =
  | string
  | number
  | undefined
  | readonly Sortable[]
  | { readonly [x: string]: Sortable }

const sortEntryByKey = (
  [a]: readonly [string, Sortable],
  [b]: readonly [string, Sortable],
): -1 | 0 | 1 => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const handleEntry = ([key, value]: readonly [string, Sortable]): string =>
  [key, sortAndSerializeOptions(value)].join(":")

const sortAndSerializeOptions = (input: Sortable): string =>
  isObject(input) ?
    Object.entries(input).sort(sortEntryByKey).map(handleEntry).join(";")
  : `${input}`

export const sortAndSerialize = (input: SquircleOptionsClip): string =>
  // @ts-expect-error Interfaces don't have index signatures
  sortAndSerializeOptions(fillOptions(input))
