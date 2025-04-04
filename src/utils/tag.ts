import { isObject } from "./isObject.js"

import type { JSX } from "react"

import type { ReadonlyRecord } from "../types.js"

const handleStringTuple = (input: readonly [string, string]): string =>
  input.join(":")

const handleEntry = ([key, value]: readonly [
  string,
  string | number | true | ReadonlyRecord<string, string>,
]): string =>
  value === true ?
    ` ${key}`
  : ` ${key}='${
      isObject(value) ?
        Object.entries(value).map(handleStringTuple).join(";")
      : value
    }'`

/**
 * @param tagName A HTML or SVG element tag name.
 * @param attributes A `string`-keyed record of `string`, `number`, `true`, or
 *   `string`-keyed record of strings (like CSS properties).
 * @param children Any number of strings to add as children between the tag open
 *   and close.
 * @returns XML tag as string.
 */
export const tag = (
  tagName: keyof JSX.IntrinsicElements,
  attributes: ReadonlyRecord<
    string,
    string | number | true | ReadonlyRecord<string, string>
  >,
  ...children: ReadonlyArray<string>
): string =>
  `<${tagName}${Object.entries(attributes)
    .map(handleEntry)
    .join("")}>${children.join("")}</${tagName}>`
