import * as React from "react"

import { isFunction } from "../utils/isFunction.js"
import { useSquircle } from "./useSquircle.js"

import type { GetAttributes, Types } from "../types.js"

export declare namespace Squircle {
  type Props<T extends Types.TagName> = GetAttributes<T> & {
    readonly as: T
    readonly ref?: React.Ref<Types.TagNameMap[T]>
    readonly squircle?:
      | Types.SquircleOptionsClipReact
      | Types.SquircleOptionsBackgroundReact
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
export const Squircle = <T extends Types.TagName>({
  as: Element,
  ref,
  squircle,
  style,
  children,
  ...restProps
}: Squircle.Props<T>): React.ReactNode => {
  // Create our own object-style ref so that we can observe the size
  const refObject = React.useRef<Types.TagNameMap[T]>(null)

  // Merge the (possibly-) provided ref and the above one
  const mergedRef: React.RefCallback<Types.TagNameMap[T]> = (instance) => {
    // Assign our object-style ref
    refObject.current = instance

    // Run their callback-style ref and return its cleanup
    if (isFunction(ref)) {
      return ref(instance)
    }

    // Assign their object-style ref
    if (ref) {
      ref.current = instance
    }
  }

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
