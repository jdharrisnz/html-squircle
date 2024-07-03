import { Types } from "./types.js"

/** @internal */
const handleEntry = ([key, value]: readonly [
  string,
  string | number | true | Readonly<Record<string, string>>
]): string =>
  value === true
    ? ` ${key}`
    : ` ${key}='${
        typeof value === "object"
          ? Object.entries(value)
              .map((e) => e.join(":"))
              .join(";")
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
export const tag = <T extends Types.TagName, C extends Types.Children>(
  tagName: T,
  attributes: Types.Attributes,
  ...children: C
): string =>
  `<${tagName}${Object.entries(attributes)
    .map(handleEntry)
    .join("")}>${children.join("")}</${tagName}>`
