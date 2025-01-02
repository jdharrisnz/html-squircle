# html-squircle

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/example-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="public/example-light.png">
  <img alt="Example of the nicely-rounded corners this package can generate." src="public/example-light.png" width="300px">
</picture>

`html-squircle` is a lightweight, framework-agnostic JavaScript package designed
to create superellipse squircles (smooth, rounded shapes) that can be used as
SVG clip paths or backgrounds for web elements. This package is perfect for
developers looking to add modern, beautifully-rounded corners to the web with
minimal effort.

## Features

- Generate squircles as SVG strings for use in `clip-path` or `background-image`
  inline styles.
- Unlike a true superellipse, transitions gracefully into straight edges, making
  it suitable for UI elements of various sizes.
- Customizable curve length, curve smoothness, background (solid color or
  gradient), stroke color, stroke width, and SVG injections to defs or body.
- Easy to use with any web framework or vanilla JavaScript.
- Exports a React component that will sync with the size of an element and
  optionally cache results globally.

## Installation

You can install `html-squircle` using npm:

```zsh
npm install html-squircle
```

## Usage

After installing `html-squircle`, you can import and use it in your project as
follows:

```ts
import { backgroundSquircle, clipSquircle } from "html-squircle"

import type { Types } from "html-squircle"

const squircleSquare200: Types.SquircleOptionsBackground = {
  width: 200,
  height: 200,
  stroke: "black",
  strokeWidth: 2,
  background: "#ff6347",
}

// Example usage for a clip path
const clipPathStyle = clipSquircle(squircleSquare200)
document.getElementById("yourElementId").style.clipPath = clipPathStyle

// Example usage for a background with a solid color
const backgroundStyle = backgroundSquircle(squircleSquare200)
document.getElementById("anotherElementId").style.backgroundImage =
  backgroundStyle
```

Or, in React:

```tsx
import * as React from "react"
import { Squircle } from "html-squircle/react"

function Example() {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Squircle
      as="div"
      props={{
        ref,
      }}
    >
      Hello, world!
    </Squircle>
  )
}
```

The default values for `curveLength` (calculated based on shortest side) and
`roundness` (0.2) will produce shapes exactly like Apple's app icons when the
`width` and `height` are equal.

For React, `Squircle` and `CacheProvider` are also exported (requires React 19
due to the changes to `ref` props). `Squircle` is a polymorphic component,
accepting `as`, `props`, and `squircle` props.

- `as`: The name of a primitive element, or a function component.
- `props`: The props required by the above component, including a `ref`.
- `squircle`: Options to pass to the underlying squircle-computation function,
  excluding `width` and `height`, since those are measured and kept in sync for
  you.

To memoize the results of squircle computation globally, wrap your app in the
`CacheProvider` component. You may pass to this a `capacity` prop (default 20)
for the LRU cache used in the backend. If you don't use this, results will be
memoized at the component level, and all the cache-related code should be
tree-shaken at compile time.

## Tips for function options input

When trying to control the sharpness of the curve, first adjust the
`curveLength` parameter. If you're not getting the result you want, then reach
for `roundness`.

The `backgroundSquircle` function is only really useful if you need to add a
stroke to your background (regular CSS `border` will be clipped if you use
`clip-path`), or if you need to do something else fancy with SVG (see below).

Use the `injectedDefs` and `injectedBody` params if you need to do anything
custom with the generated background SVG. This must be a `string`. You can refer
to other elements of the SVG in `<use />` elements by referring to their ids:
`#path`, `#rect`, `#clip`, `#mask`, `#grad`. To create stringified xml tag
structures easily, you can use the exported `tag` function. For maximum browser
support and to align with the rest of the SVG result, always use single quotes
in strings. Your input will be URI-encoded for you, so don't do this yourself.

The values can be partly animated with CSS. The width and height will smoothly
transition, but the curves will fade from one definition to the next.
