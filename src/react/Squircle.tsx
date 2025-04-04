import * as React from "react"

import { isFunction } from "../utils/isFunction.js"
import { useSquircle } from "./useSquircle.js"

import type {
  SquircleOptionsBackgroundReact,
  SquircleOptionsClipReact,
} from "../types.js"

type ElementOf<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T] extends (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    React.DetailedHTMLProps<infer _, infer A>
  ) ?
    A
  : React.JSX.IntrinsicElements[T] extends React.SVGProps<infer A> ? A
  : never

export declare namespace Squircle {
  type Props<T extends keyof React.JSX.IntrinsicElements> =
    React.JSX.IntrinsicElements[T] & {
      readonly as: T
      readonly ref?: React.Ref<ElementOf<T>>
      readonly squircle?:
        | SquircleOptionsClipReact
        | SquircleOptionsBackgroundReact
    }
}

/**
 * Polymorphic Squircle component for rendering a squircle where the size is
 * observed from the DOM element to which it is applied.
 *
 * @param as The name of a primitive element.
 * @param squircle (optional) The options to pass to the squircle computation
 *   function. You can prevent extra re-renders by passing a memoized value.
 */
export const Squircle = <T extends keyof React.JSX.IntrinsicElements>({
  as: Element,
  ref,
  squircle,
  style,
  children,
  ...restProps
}: Squircle.Props<T>): React.JSX.Element => {
  // Create our own object-style ref so that we can observe the size
  const refObject = React.useRef<ElementOf<T>>(null)

  // Merge the (possibly-) provided ref and the above one
  const mergedRef: React.RefCallback<ElementOf<T>> = (instance) => {
    // Assign our object-style ref
    refObject.current = instance

    // Run their callback-style ref and return its cleanup
    if (isFunction(ref)) {
      // @ts-expect-error The union is too complex
      return ref(instance)
    }

    // Assign their object-style ref
    if (ref) {
      // @ts-expect-error The union is too complex
      ref.current = instance
    }
  }

  // @ts-expect-error The union is too complex
  const squircleStyle = useSquircle(refObject, squircle)

  return (
    // @ts-expect-error Too much complexity
    <Element
      // @ts-expect-error Too much complexity
      ref={mergedRef}
      style={{
        ...style,
        ...squircleStyle,
      }}
      {...restProps}
    >
      {children}
    </Element>
  )
}
