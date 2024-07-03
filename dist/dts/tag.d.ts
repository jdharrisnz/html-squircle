import { Types } from "./types.js";
/**
 * @param tagName A HTML or SVG element tag name.
 * @param attributes A `string`-keyed record of `string`, `number`, `true`, or
 *   `string`-keyed record of strings (like CSS properties).
 * @param children Any number of strings to add as children between the tag open
 *   and close.
 * @returns XML tag as string.
 */
export declare const tag: <T extends Types.TagName, C extends Types.Children>(tagName: T, attributes: Types.Attributes, ...children: C) => string;
//# sourceMappingURL=tag.d.ts.map