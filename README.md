# Hypercomp

An easy to use, powerful and expressive graphics library for TypeScript that compiles to optimized SVG filters, letting you apply complex visual effects to your HTML and SVG elements.

# Motivation

SVG filters provide an extremely powerful node-based compositing system that can be used across HTML and SVG, but they are held back by the fact that it is impossible to express function composition in XML in a natural way. Hypercomp fixes this by providing a functional API for composing effects in TypeScript, and compiling it down to an equivalent SVG filter.

## Features

- **Composable filters:** Define complex, composable and reusable filter effects using JavaScript functions.
- **Full SVG Filter Support:** Access, apply and compose all SVG filter effects with ease.
- **Fluid API:** Each function has a chainable variant.

## Installation

```bash
npm install hypercomp
```

## Examples

The following example creates a squiggly line around the source image by extracting the source image from a slightly dilated version of itself, and then displacing it using fractal noise.

![Hypercomp Demo 2024-08-06T23 06 08@2x](https://github.com/user-attachments/assets/adacb2ac-87bc-4e41-a796-441f48a797e5)

```tsx
import { env, flood, filter, fractalNoise, css } from "hypercomp";

const radius = 2;
const width = 2;
const freq = 0.01;
const octaves = 1;
const scale = 15;

const effects =
  // Take the source image and merge it with
  env.source.merge(
    // a flood effect
    flood("#30597E")
      // which is composited into the source image dilated by radius and width
      .in(env.source.dilate({ r: radius + width }))
      // from which we subtract the source image dilated by radius
      // (the difference between the two dilated versions will form the stroke width)
      .out(env.source.dilate({ r: radius }))
      // which we finally displace using fractal noise.
      .displace(fractalNoise({ freq, octaves }), {
        scale,
      })
  );

const style = {
  // css() compiles it to a data url which doesn't work in Safari.
  // Render it to an SVG element there instead using the other functions (see API).
  filter: css(filter(effects)),
};

return <div style={style}>hello world</div>;
```

The following example takes the source, extracts sharp edges, applies a dilation effect, and adds a blue shadow.

![Hypercomp Demo 2024-08-06T23 31 10@2x](https://github.com/user-attachments/assets/f95fdcd8-2035-480a-9a79-2380342a9dad)

```tsx
import { env, convolve, filter, dilate, merge, shadow, css } from "hypercomp";

const withEdges = merge([
  env.source,
  // sobel
  env.source.convolve({
    // x direction
    kernel: [1, 0, -1, 2, 0, -2, 1, 0, -1],
  }),
  env.source.convolve({
    // y direction
    kernel: [1, 2, 1, 0, 0, 0, -1, -2, -1],
  }),
])
  .dilate({ r: 2 })
  .shadow({ color: "blue" });

const style = {
  filter: css(filter(withEdges)),
};

return <div style={style}>hello world</div>;
```

The following example blurs the source image, uses it as the bump map for lighting, and then composites the lighting onto a black background using screen blending.

![Hypercomp Demo 2024-08-06T23 35 37@2x](https://github.com/user-attachments/assets/a7fa060c-6019-4199-8ff3-76470bd617d0)

```tsx
import {
  env,
  flood,
  filter,
  screen,
  blur,
  specularLight,
  css,
} from "hypercomp";

const withLight = flood("black").screen(
  env.sourceAlpha.blur({ r: 1 }).specularLight({
    strength: 4,
    shininess: 20,
    color: "#20b2aa",
    light: { type: "point", x: 40, y: -100, z: 200 },
  })
);

const style = {
  filter: css(filter(withEdges)),
};

return <div style={style}>hello world</div>;
```

## API

### Render functions

#### `filter(root, attributes?)`

Creates a filter from the root node and attributes. Represents the SVG filter.

- **root**: The root node of the filter.
- **attributes**: (optional) SVG filter attributes.
  - **id**: `string` - Identifier for the filter.
  - **filterUnits**: `"userSpaceOnUse" | "objectBoundingBox"` - Coordinate system for the filter.
  - **primitiveUnits**: `"userSpaceOnUse" | "objectBoundingBox"` - Coordinate system for filter primitives.
  - **colorInterpolationFilters**: `"auto" | "sRGB" | "linearRGB" | "inherit"` - Color interpolation filters.

#### `toSVG(filter)`

Converts a filter to an SVG string.

- **filter**: The filter to convert.
- **Returns**: A `string` representing the SVG.

#### `toDataURL(filter)`

Converts a filter to a data URL.

- **filter**: The filter to convert.
- **Returns**: A `string` representing the data URL.

#### `css(filter)`

Converts a filter to a CSS filter string.

- **filter**: The filter to convert.
- **Returns**: A `string` suitable for use in CSS `filter` property.

#### `toEffects(filter)`

Renders the effects of the filter.

- **filter**: The filter to render.
- **Returns**: A `string` representing the rendered effects.

#### `toFilter(filter)`

Renders the filter as an SVG filter element.

- **filter**: The filter to render.
- **Returns**: A `string` representing the SVG filter element.

### Environment nodes

#### `env`

The `env` object provides nodes representing the filter environment.

- **source**: Represents `SourceGraphic`.
- **sourceAlpha**: Represents `SourceAlpha`.
- **background**: Represents `BackgroundImage`.
- **backgroundAlpha**: Represents `BackgroundAlpha`.
- **fill**: Represents `FillPaint`.
- **stroke**: Represents `StrokePaint`.

### Node functions

Node functions are used to create nodes that represent filter primitives. They can be arbitrarily chained, provided as inputs to other nodes, saved, reused, or used as the root node for a filter.

**Note:** These are the non-chainable function variants. Each function also has a chainable version accessible on nodes.

**Note:** In addition to what's documented below, each configuration object also takes `x`, `y`, `width`, and `height` properties to define the region of the filter effect.

#### `blur(node, config?)`

Applies a Gaussian blur to the input node.

- **node**: The node to blur.
- **config**: (optional) Configuration options.
  - **r**: `number` - Radius of the blur.
  - **edgeMode**: `"duplicate" | "wrap" | "none"` - How to handle edges.

#### `blend(node1, node2, config?)`

Blends two nodes together using the specified mode.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.
  - **mode**: `"normal" | "multiply" | "screen" | ...` - Blend mode.

#### `screen(node1, node2, config?)`

Convenience function for blending two nodes using the screen mode.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `multiply(node1, node2, config?)`

Convenience function for blending two nodes using the multiply mode.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `colorMatrix(node, config?)`

Applies a color matrix to the input node.

- **node**: The node to apply the color matrix to.
- **config**: (optional) Configuration options.
  - **type**: `"matrix" | "saturate" | "hueRotate" | "luminanceToAlpha"` - Type of color matrix.
  - **values**: `string | number | number[]` - Matrix values.

#### `componentTransfer(node, config?)`

Applies a component transfer to the input node.

- **node**: The node to apply the transfer to.
- **config**: (optional) Configuration options.
  - **r**: Transfer function for the red channel.
  - **g**: Transfer function for the green channel.
  - **b**: Transfer function for the blue channel.
  - **a**: Transfer function for the alpha channel.

#### `composite(node1, node2, config?)`

Composites two nodes together with the specified operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.
  - **op**: `"over" | "in" | "out" | "atop" | "xor" | "arithmetic"` - Composite operator.
  - **k1, k2, k3, k4**: `number` - Coefficients for the arithmetic operator.

#### `over(node1, node2, config?)`

Convenience method for compositing with the "over" operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `inside(node1, node2, config?)`

Convenience method for compositing with the "in" operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `out(node1, node2, config?)`

Convenience method for compositing with the "out" operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `xor(node1, node2, config?)`

Convenience method for compositing with the "xor" operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `atop(node1, node2, config?)`

Convenience method for compositing with the "atop" operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.

#### `arithmetic(node1, node2, config?)`

Convenience method for compositing with the "arithmetic" operator.

- **node1**: The top layer node.
- **node2**: The bottom layer node.
- **config**: (optional) Configuration options.
  - **k1, k2, k3, k4**: `number` - Coefficients for the arithmetic operation.

#### `convolve(node, config?)`

Applies a convolution matrix to the input node.

- **node**: The node to apply the convolution to.
- **config**: (optional) Configuration options.
  - **order**: `number` - Order of the convolution matrix.
  - **kernel**: `string | number[]` - Kernel matrix values.
  - **divisor**: `number` - Divisor for the kernel matrix.
  - **bias**: `number` - Bias to apply.
  - **targetX**: `number` - Target X coordinate.
  - **targetY**: `number` - Target Y coordinate.
  - **edgeMode**: `"duplicate" | "wrap" | "none"` - Edge handling mode.
  - **preserveAlpha**: `boolean` - Whether to preserve alpha.

#### `diffuseLight(node, config?)`

Applies a diffuse lighting effect to the input node.

- **node**: The node to apply the effect to.
- **config**: (optional) Configuration options.
  - **strength**: `number` - Diffuse strength.
  - **scale**: `number` - Surface scale.
  - **color**: `string` - Lighting color.
  - **light**: Configuration for the light source.
    - **type**: `"point"` | `"distant"` | `"spot"` - Light source type.
    - **x, y, z**: `number` - Light position coordinates.
    - **azimuth, elevation**: `number` - Light direction for distant lights.
    - **pointsAtX, pointsAtY, pointsAtZ**: `number` - Target position for spot lights.
    - **specularExponent, limitingConeAngle**: `number` - Spot light focus and cone angle.

#### `displace(node1, node2, config?)`

Displaces the input node according to the displacement map.

- **node1**: The node to displace.
- \*\*node

2\*\*: The displacement map node.

- **config**: (optional) Configuration options.
  - **scale**: `number` - Scale factor for displacement.
  - **xChannel**: `"R" | "G" | "B" | "A"` - X channel selector.
  - **yChannel**: `"R" | "G" | "B" | "A"` - Y channel selector.

#### `flood(color?, config?)`

Applies a flood effect with the given color and opacity.

- **color**: `string` (optional) - The flood color.
- **config**: (optional) Configuration options.
  - **opacity**: `number` - Opacity of the flood effect.

#### `image(href, config?)`

Renders an image node with the specified configuration.

- **href**: `string` - URL of the image.
- **config**: (optional) Configuration options.
  - **preserveAspectRatio**: `string` - Aspect ratio handling.
  - **crossorigin**: `"anonymous" | "use-credentials"` - Cross-origin settings.

#### `merge(nodes, config?)`

Merges multiple nodes into one.

- **nodes**: Array of nodes to merge.
- **config**: (optional) Configuration options.

#### `morph(node, config?)`

Morphs the input node with specified operator and radius.

- **node**: The node to morph.
- **config**: (optional) Configuration options.
  - **op**: `"erode"` | `"dilate"` - Morphology operator.
  - **r**: `number` - Radius for the effect.

#### `dilate(node, config?)`

Convenience function for morphing with the "dilate" operator.

- **node**: The node to dilate.
- **config**: (optional) Configuration options.
  - **r**: `number` - Radius for the effect.

#### `erode(node, config?)`

Convenience function for morphing with the "erode" operator.

- **node**: The node to erode.
- **config**: (optional) Configuration options.
  - **r**: `number` - Radius for the effect.

#### `offset(node, config?)`

Offsets the input node.

- **node**: The node to offset.
- **config**: (optional) Configuration options.
  - **dx**: `number` - Horizontal offset.
  - **dy**: `number` - Vertical offset.

#### `shadow(node, config?)`

Adds a drop shadow to the input node.

- **node**: The node to apply the shadow to.
- **config**: (optional) Configuration options.
  - **dx**: `number` - Horizontal offset.
  - **dy**: `number` - Vertical offset.
  - **r**: `number` - Standard deviation for the blur.
  - **color**: `string` - Shadow color.
  - **opacity**: `number` - Shadow opacity.

#### `specularLight(node, config?)`

Applies specular lighting to the input node.

- **node**: The node to apply the lighting effect to.
- **config**: (optional) Configuration options.
  - **strength**: `number` - Specular strength.
  - **shininess**: `number` - Specular exponent.
  - **scale**: `number` - Surface scale.
  - **color**: `string` - Lighting color.
  - **light**: Configuration for the light source.
    - **type**: `"point"` | `"distant"` | `"spot"` - Light source type.
    - **x, y, z**: `number` - Light position coordinates.
    - **azimuth, elevation**: `number` - Light direction for distant lights.
    - **pointsAtX, pointsAtY, pointsAtZ**: `number` - Target position for spot lights.
    - **specularExponent, limitingConeAngle**: `number` - Spot light focus and cone angle.

#### `tile(node, config?)`

Applies a tile effect to the input node.

- **node**: The node to apply the tile effect to.
- **config**: (optional) Configuration options.

#### `turbulence(config?)`

Generates a turbulence effect.

- **config**: (optional) Configuration options.
  - **freq**: `number` - Base frequency.
  - **octaves**: `number` - Number of octaves.
  - **seed**: `number` - Random seed value.
  - **type**: `"fractalNoise" | "turbulence"` - Type of turbulence.
  - **stitch**: `"noStitch" | "stitch"` - Tile stitching mode.

#### `fractalNoise(config?)`

Convenience function for a fractal noise effect.

- **config**: (optional) Configuration options.
  - **freq**: `number` - Base frequency.
  - **octaves**: `number` - Number of octaves.
  - **seed**: `number` - Random seed value.
  - **stitch**: `"noStitch" | "stitch"` - Tile stitching mode.

## Contributing

Feel free to contribute by submitting issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
