# Hypercomp

An easy to use, powerful and expressive graphics library for TypeScript that compiles to optimized SVG filters, letting you apply complex visual effects to your HTML and SVG elements.

## Motivation

SVG filters provide an extremely powerful node-based compositing system that can be used across HTML and SVG, but they are held back by the fact that it is impossible to express function composition in XML in a natural way, making them very hard to write, compose and reuse. Hypercomp fixes this by providing a functional API for composing effects in TypeScript, and compiling them down to an equivalent SVG filter.

## Features

- **Composable filters:** Define complex, composable and reusable filter effects using JavaScript functions.
- **Full SVG filter support:** Anything you can do with SVG filters, you can do with Hypercomp.
- **A fluid, functional API:** Write expressive and readable code that is easy to understand and maintain.

## Installation

```bash
npm install hypercomp
```

## Examples

The following example creates a squiggly line around the source image by extracting the source image from a slightly dilated version of itself, and then displacing it using fractal noise.

![Hypercomp Demo 2024-08-06T23 06 08@2x](https://github.com/user-attachments/assets/adacb2ac-87bc-4e41-a796-441f48a797e5)

```tsx
import { Effect, css } from "hypercomp";

const radius = 2;
const width = 2;
const freq = 0.01;
const octaves = 1;
const scale = 15;

const effects =
  // Create a flood
  Effect.flood("#30597E")
    // and composite it into the source image dilated by radius and width
    .in(Effect.source.dilate(radius + width))
    // from which we subtract the source image dilated by radius
    // (the difference between the two dilated versions will form the stroke)
    .out(Effect.source.dilate(radius))
    // which we finally displace using fractal noise.
    .displace(fractalNoise(freq, { octaves }), scale)
    // and draw it over the source image.
    .over(Effect.source);

const style = {
  filter: css(effects),
};

return <div style={style}>hello world</div>;
```

The following example takes the source, extracts sharp edges, applies a dilation effect, and adds a blue shadow.

![Hypercomp Demo 2024-08-06T23 31 10@2x](https://github.com/user-attachments/assets/f95fdcd8-2035-480a-9a79-2380342a9dad)

```tsx
import { Effect, css } from "hypercomp";

const withEdges = Effect.merge([
  Effect.source,
  // sobel
  Effect.source.convolve([1, 0, -1, 2, 0, -2, 1, 0, -1]), // x direction
  Effect.source.convolve([1, 2, 1, 0, 0, 0, -1, -2, -1]), // y direction
])
  .dilate(2)
  .shadow(1, { color: "blue" });

const style = {
  filter: css(withEdges),
};

return <div style={style}>hello world</div>;
```

The following example blurs the source image, uses it as the bump map for lighting, and then composites the lighting onto a black background using screen blending.

![Screenshot 2024-08-07 at 12 46 25](https://github.com/user-attachments/assets/2d2a5272-d52a-4bf1-9cd0-571145043f7b)

```tsx
import { Effect, Light } from "hypercomp";

const withLight = Effect.flood("black").screen(
  Effect.sourceAlpha
    .blur(1)
    .specular(Light.pointLight({ x: 460, y: 110, z: 680 }), {
      strength: 4,
      shininess: 20,
    })
);

const style = {
  filter: css(withLight),
};

return <div style={style}>hello world</div>;
```

## API

### Render functions

#### `css(filter, key?)`

Compiles the filter and returns a CSS `filter` property value.
When key is omitted, the effect is rendered to a data URL. When key is present, the filter is rendered to the dom. Subsequent calls with the same key will return the same data URL, and update the rendered filter.

**IMPORTANT**: Safari does not support data URLs for CSS filters. It is thus recommended to use the `key` parameter, or to use the `useFilter` hook from `hypercomp/react`, which takes care of it for you.

- **filter**: The filter to render.
- **key**: (optional) Key to use for rendering to the DOM.
- **Returns**: A `string` suitable for use in CSS `filter` property.

#### `unmount(key)`

Unmounts the filter with the given key from the DOM.

- **key**: Key of the filter to unmount.

#### `compile(filter)`

Returns the compiled filter as a a string. If you pass the result of an effect function directly, it will only return the equivalent effects without the outer `<filter>` tag. If you wrap it in a `filter()` call, it will return the full SVG filter including the `<filter>` tag.

For example, `compile(Effect.source.blur(2))` will return `<feGaussianBlur stdDeviation="2"/>`, while `compile(filter(Effect.source.blur(2)))` will return `<filter><feGaussianBlur stdDeviation="2"/></filter>`.

#### Usage with React

The `hypercomp/react` module provides the `useFilter` hook you can use to tie the lifetime of a dom-rendered filter to the lifetime of a component. This is most useful when targeting Safari, where data URLs for CSS filters are not supported.

```tsx
import { useFilter } from "hypercomp/react";

const MyComponent = () => {
  return (
    <div style={{ filter: useFilter(Effect.source.dilate(2)) }}>
      hello world
    </div>
  );
};
```

### Creating filters

You create filters by composing effects. They can be arbitrarily chained, provided as inputs to other effects, saved, reused, or compiled to an output using the `css` or `compile` functions.

Effect functions usually take 0-2 effect inputs, 0-1 effect arguments and an optional configuration object. Each configuration object takes at the minimum the `x`, `y`, `width`, and `height` properties to define the region of the filter effect, which is not documented individually here.

When you are done composing your filter, you can compile it or render it by passing it to the `compile` or `css` functions.

Optionally, you can call `.filter()` on your effect, which lets you specify the attributes of the rendered filter tag.

#### `.filter(attributes?)`

Lets you specify attributes of the rendered filter tag. This is optional, if you don't call `.filter()`, the behavior will depend on the render function you use.

- **attributes**: (optional) SVG filter attributes.
  - **id**: `string` - Filter ID.
  - **x**: `number` - X coordinate.
  - **y**: `number` - Y coordinate.
  - **width**: `number` - Width.
  - **height**: `number` - Height.
  - **filterUnits**: `"userSpaceOnUse" | "objectBoundingBox"` - Filter units.
  - **primitiveUnits**: `"userSpaceOnUse" | "objectBoundingBox"` - Primitive units.
  - **colorInterpolationFilters**: `"auto" | "sRGB" | "linearRGB" | "inherit"` - Color interpolation filters.

### Constants

Constants are available as static properties on the `Effect` class and can be used as inputs or starting points to effect chains.

Example:

```tsx
Effect.flood("red").in(Effect.source.blur(2)); // Floods a blurred source graphic with red.
```

- **`Effect.source`**: Represents `SourceGraphic`.
- **`Effect.sourceAlpha`**: Represents `SourceAlpha`.
- **`Effect.background`**: Represents `BackgroundImage`.
- **`Effect.backgroundAlpha`**: Represents `BackgroundAlpha`.
- **`Effect.fill`**: Represents `FillPaint`.
- **`Effect.stroke`**: Represents `StrokePaint`.

### Basis functions

In addition to constants, the following functions are available as static methods on the `Effect` class and can be used as inputs or starting points to effects.

#### `Effect.flood(color, config?)`

Applies a flood effect with the given color and opacity.

- **color**: `string` (optional) - The flood color.
- **config**: (optional) Configuration options.
  - **opacity**: `number` - Opacity of the flood effect.

#### `Effect.image(href, config?)`

Creates an image.

- **href**: `string` - URL of the image.
- **config**: (optional) Configuration options.

  - **preserveAspectRatio**: `string` - Aspect ratio handling.
  - **crossorigin**: `"anonymous" | "use-credentials"` - Cross-origin settings.

#### `Effect.merge(inputs, config?)`

Merges an array of inputs with the last element as the topmost layer.

- **inputs**: `Effect[]` - Array of inputs to merge.
- **config**: (optional) Configuration options.

#### `Effect.turbulence(frequency, config?)`

Creates turbulence noise.

- **frequency**: `number` - Base frequency.
- **config**: (optional) Configuration options.
  - **octaves**: `number` - Number of octaves.
  - **seed**: `number` - Random seed value.
  - **stitch**: `"noStitch" | "stitch"` - Tile stitching mode.

#### `Effect.fractalNoise(frequency, config?)`

Creates fractal noise.

- **frequency**: `number` - Base frequency.
- **config**: (optional) Configuration options.
  - **octaves**: `number` - Number of octaves.
  - **seed**: `number` - Random seed value.
  - **stitch**: `"noStitch" | "stitch"` - Tile stitching mode.

### Compositing functions

#### `.over(input, config?)`

Composites the input using the "over" operator.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.inside(input, config?)`

Composites the input using the "in" operator.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.out(input, config?)`

Composites the input using the "out" operator.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.xor(input, config?)`

Composites the input using the "xor" operator.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.atop(input, config?)`

Composites the input using the "atop" operator.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.arithmetic(input, config?)`

Composites the input using the "arithmetic" operator.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

  - **k1, k2, k3, k4**: `number` - Coefficients for the arithmetic operation.

### Common functions

#### `.blur(stdDeviation, config?)`

Applies a Gaussian blur.

- **stdDeviation**: `number` - Standard deviation of the blur.
- **config**: (optional) Configuration options.
  - **edgeMode**: `"duplicate" | "wrap" | "none"` - Edge handling mode.

#### `.convolve(kernel, config?)`

Applies a convolution matrix.

- **kernel**: `number[]` - Kernel matrix values.
- **config**: (optional) Configuration options.
  - **edgeMode**: `"duplicate" | "wrap" | "none"` - Edge handling mode.
  - **bias**: `number` - Bias value.
  - **divisor**: `number` - Divisor value.
  - **targetX**: `number` - Target X coordinate.
  - **targetY**: `number` - Target Y coordinate.
  - **preserveAlpha**: `boolean` - Preserve alpha channel.

#### `.displace(scale, config?)`

Applies a displacement map.

- **input1**: The input to displace.
- **input2**: The displacement map.
- **scale**: `number` - Scale factor for displacement.
- **config**: (optional) Configuration options.
  - **xChannel**: `"R" | "G" | "B" | "A"` - X channel.
  - **yChannel**: `"R" | "G" | "B" | "A"` - Y channel.

#### `.offset(config?)`

Applies an offset.

- **config**: (optional) Configuration options.
  - **dx**: `number` - Horizontal offset.
  - **dy**: `number` - Vertical offset.

#### `.shadow(stdDeviation?, config?)`

Adds a drop shadow.

- **stdDeviation**: `number` (optional) - Standard deviation for the blur.
- **config**: (optional) Configuration options.
  - **dx**: `number` - Horizontal offset.
  - **dy**: `number` - Vertical offset.
  - **color**: `string` - Shadow color.
  - **opacity**: `number` - Shadow opacity.

#### `.tile(config?)`

Applies a tile effect.

- **config**: (optional) Configuration options.

### Blending functions

#### `.normal(input, config?)`

Blends the input using the "normal" mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.screen(input, config?)`

Blends the input using the screen mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.multiply(input, config?)`

Blends the input using the multiply mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.overlay(input, config?)`

Blends the input using the overlay mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.darken(input, config?)`

Blends the input using the darken mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.lighten(input, config?)`

Blends the input using the lighten mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.colorDodge(input, config?)`

Blends the input using the color dodge mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.colorBurn(input, config?)`

Blends the input using the color burn mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.hardLight(input, config?)`

Blends the input using the hard light mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.softLight(input, config?)`

Blends the input using the soft light mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.difference(input, config?)`

Blends the input using the difference mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.exclusion(input, config?)`

Blends the input using the exclusion mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.hue(input, config?)`

Blends the input using the hue mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.saturation(input, config?)`

Blends the input using the saturation mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.color(input, config?)`

Blends the input using the color mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

#### `.luminosity(input, config?)`

Blends the input using the luminosity mode.

- **input**: The bottom layer.
- **config**: (optional) Configuration options.

### Morphology functions

#### `.dilate(radius, config?)`

Applies a dilation effect.

- **radius**: `number` - Radius for the effect.
- **config**: (optional) Configuration options.

#### `.erode(radius, config?)`

Applies an erosion effect.

- **radius**: `number` - Radius for the effect.
- **config**: (optional) Configuration options.

### Color manipulation functions

#### `.colorMatrix(matrix, config?)`

Applies a color matrix. The matrix is a 4x5 matrix, where the last column is the offset. The matrix can be provided either as an array of 20 numbers, or as a `ColorMatrix` object where the default values are 1 for the diagonal and 0 for the rest.

```typescript
type ColorMatrixRow = {
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  o?: number; // Offset
};

type ColorMatrix = {
  r?: ColorMatrixRow;
  g?: ColorMatrixRow;
  b?: ColorMatrixRow;
  a?: ColorMatrixRow;
};
```

- **matrix**: `number[] | ColorMatrix` - Matrix values.
- **config**: (optional) Configuration options.

#### `.componentTransfer(config?)`

Applies component transfer.

- **config**: (optional) Configuration options.

#### `.hueRotate(angle, config?)`

Rotates the hue.

- **angle**: `number` - Angle of rotation.
- **config**: (optional) Configuration options.

#### `.luminanceToAlpha(config?)`

Converts luminance to alpha.

- **config**: (optional) Configuration options.

#### `.saturate(amount, config?)`

Changes the saturation.

- **amount**: `number` - Saturation amount.
- **config**: (optional) Configuration options.

### Lighting functions

Lighting functions take a light source, and create a lighting effect using their input as height map.

Example:

```tsx
Effect.sourceAlpha.blur(1).specular(pointLight({ x: 460, y: 110, z: 680 }), {
  strength: 4,
  shininess: 20,
});
```

#### `.specular(light, config?)`

Creates a specular lighting effect. You should composite it using additive blending.

- **light**: The light source to use.
- **config**: (optional) Configuration options.
  - **strength**: `number` - Specular strength.
  - **shininess**: `number` - Specular exponent.
  - **scale**: `number` - Surface scale.
  - **color**: `string` - Lighting color.

#### `.diffuse(light, config?)`

Applies a diffuse lighting effect to the input. You should composite it using the `multiply` blending mode.

- **light**: The light source to use.
- **config**: (optional) Configuration options.
  - **strength**: `number` - Diffuse strength.
  - **scale**: `number` - Surface scale.
  - **color**: `string` - Lighting color.

### Light sources

Light sources are available on the `Light` export and can be used as inputs to lighting functions.

#### `Light.pointLight(config?)`

Creates a point light source.

- **x**: `number` - X coordinate.
- **y**: `number` - Y coordinate.
- **z**: `number` - Z coordinate.

#### `Light.distantLight(config?)`

Creates a distant light source.

- **azimuth**: `number` - Azimuth angle.
- **elevation**: `number` - Elevation angle.

#### `Light.spotlight(config?)`

Creates a spot light source.

- **x**: `number` - X coordinate.
- **y**: `number` - Y coordinate.
- **z**: `number` - Z coordinate.
- **pointsAtX**: `number` - X coordinate to point at.
- **pointsAtY**: `number` - Y coordinate to point at.
- **pointsAtZ**: `number` - Z coordinate to point at.
- **specularExponent**: `number` - Specular exponent.

### Component transfer functions

Component transfer functions are available on the `Transfer` export and are used in combination with the `componentTransfer` effect.

Example:

```typescript
// Increase the contrast of the alpha channel.
Effect.source.componentTransfer({
  a: Transfer.linear(18, -9),
});
```

#### `Transfer.gamma(amplitude, exponent, offset)`

Creates a gamma transfer function.

- **amplitude**: `number` - Amplitude.
- **exponent**: `number` - Exponent.
- **offset**: `number` - Offset.

#### `Transfer.linear(slope, intercept)`

Creates a linear transfer function.

- **slope**: `number` - Slope.
- **intercept**: `number` - Intercept.

#### `Transfer.table(values)`

Creates a table transfer function.

- **values**: `number[]` - Table values.

#### `Transfer.discrete(values)`

Creates a discrete transfer function.

- **values**: `number[]` - Table values.

## Contributing

Feel free to contribute by submitting issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
