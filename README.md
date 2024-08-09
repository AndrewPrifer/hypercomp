# Hypercomp

An easy to use, powerful and expressive graphics library for TypeScript that compiles to optimized SVG filters, letting you apply complex visual effects to your HTML and SVG elements.

## Motivation

SVG filters provide an extremely powerful node-based compositing system that can be used across HTML and SVG, but they are held back by the fact that it is impossible to express function composition in XML in a natural way, making them very hard to write by hand. Hypercomp fixes this by providing a functional API for composing effects in TypeScript, and compiling them down to an equivalent SVG filter.

## Features

- **Composable filters:** Define complex, composable and reusable filter effects using JavaScript functions.
- **Full SVG filter support:** Access, apply and compose all SVG filter effects with ease.
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
      .in(env.source.dilate(radius + width))
      // from which we subtract the source image dilated by radius
      // (the difference between the two dilated versions will form the stroke width)
      .out(env.source.dilate(radius))
      // which we finally displace using fractal noise.
      .displace(fractalNoise(freq, { octaves }), scale)
  );

const style = {
  // css() compiles it to a data URL which doesn't work in Safari.
  // Render it to an SVG element there instead using the other functions (see API).
  filter: css(effects),
};

return <div style={style}>hello world</div>;
```

The following example takes the source, extracts sharp edges, applies a dilation effect, and adds a blue shadow.

![Hypercomp Demo 2024-08-06T23 31 10@2x](https://github.com/user-attachments/assets/f95fdcd8-2035-480a-9a79-2380342a9dad)

```tsx
import { env, filter, merge, css } from "hypercomp";

const withEdges = merge([
  env.source,
  // sobel
  env.source.convolve([1, 0, -1, 2, 0, -2, 1, 0, -1]), // x direction
  env.source.convolve([1, 2, 1, 0, 0, 0, -1, -2, -1]), // y direction
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
import { env, flood, filter, css, pointLight } from "hypercomp";

const withLight = flood("black").screen(
  env.sourceAlpha.blur(1).specular(pointLight({ x: 460, y: 110, z: 680 }), {
    strength: 4,
    shininess: 20,
    color: "white",
  })
);

const style = {
  filter: css(withLight),
};

return <div style={style}>hello world</div>;
```

## API

- [Render functions](#render-functions)
  - [`css(filter, key?)`](#cssfilter-key)
  - [`unmount(key)`](#unmountkey)
  - [`compile(filter)`](#compilefilter)
  - [Usage with React](#usage-with-react)
- [Creating filters](#creating-filters)
  - [`filter(effect, attributes?)`](#filtereffect-attributes)
- [Environment constants (`env.source`, `env.background`, ...)](#environment-constants)
- [Input functions](#input-functions)
  - [`flood(color, config?)`](#floodcolor-config)
  - [`image(href, config?)`](#imagehref-config)
- [Compositing functions](#compositing-functions)
  - [`merge(inputs, config?)`](#mergeinputs-config)
  - [`over(input1, input2, config?)`](#overinput1-input2-config)
  - [`inside(input1, input2, config?)`](#insideinput1-input2-config)
  - [`out(input1, input2, config?)`](#outinput1-input2-config)
  - [`xor(input1, input2, config?)`](#xorinput1-input2-config)
  - [`atop(input1, input2, config?)`](#atopinput1-input2-config)
  - [`arithmetic(input1, input2, config?)`](#arithmeticinput1-input2-config)
- [Common functions](#common-functions)
  - [`blur(input, stdDeviation, config?)`](#blurinput-stddeviation-config)
  - [`convolve(input, kernel, config?)`](#convolveinput-kernel-config)
  - [`displace(input1, input2, scale, config?)`](#displaceinput1-input2-scale-config)
  - [`offset(input, config?)`](#offsetinput-config)
  - [`shadow(input, stdDeviation?, config?)`](#shadowinput-stddeviation-config)
  - [`tile(input, config?)`](#tileinput-config)
- [Blending functions](#blending-functions)
  - [`normal(input1, input2, config?)`](#normalinput1-input2-config)
  - [`screen(input1, input2, config?)`](#screeninput1-input2-config)
  - [`multiply(input1, input2, config?)`](#multiplyinput1-input2-config)
  - [`overlay(input1, input2, config?)`](#overlayinput1-input2-config)
  - [`darken(input1, input2, config?)`](#darkeninput1-input2-config)
  - [`lighten(input1, input2, config?)`](#lighteninput1-input2-config)
  - [`colorDodge(input1, input2, config?)`](#colordodgeinput1-input2-config)
  - [`colorBurn(input1, input2, config?)`](#colorburninput1-input2-config)
  - [`hardLight(input1, input2, config?)`](#hardlightinput1-input2-config)
  - [`softLight(input1, input2, config?)`](#softlightinput1-input2-config)
  - [`difference(input1, input2, config?)`](#differenceinput1-input2-config)
  - [`exclusion(input1, input2, config?)`](#exclusioninput1-input2-config)
  - [`hue(input1, input2, config?)`](#hueinput1-input2-config)
  - [`saturation(input1, input2, config?)`](#saturationinput1-input2-config)
  - [`color(input1, input2, config?)`](#colorinput1-input2-config)
  - [`luminosity(input1, input2, config?)`](#luminosityinput1-input2-config)
- [Morphology functions](#morphology-functions)
  - [`dilate(input, radius, config?)`](#dilateinput-radius-config)
  - [`erode(input, radius, config?)`](#erodeinput-radius-config)
- [Noise functions](#noise-functions)
  - [`turbulence(frequency, config?)`](#turbulencefrequency-config)
  - [`fractalNoise(frequency, config?)`](#fractalnoisefrequency-config)
- [Lighting functions](#lighting-functions)
  - [`specular(input, light, config?)`](#specularinput-light-config)
  - [`diffuse(input, light, config?)`](#diffuseinput-light-config)
- [Color manipulation functions](#color-manipulation-functions)
  - [`colorMatrix(input, matrix, config?)`](#colormatrixinput-matrix-config)
  - [`componentTransfer(input, config?)`](#componenttransferinput-config)
  - [`hueRotate(input, angle, config?)`](#huerotateinput-angle-config)
  - [`luminanceToAlpha(input, config?)`](#luminancetoalphainput-config)
  - [`saturate(input, amount, config?)`](#saturateinput-amount-config)

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

For example, `compile(env.source.blur(2))` will return `<feGaussianBlur stdDeviation="2"/>`, while `compile(filter(env.source.blur(2)))` will return `<filter><feGaussianBlur stdDeviation="2"/></filter>`.

#### Usage with React

The `hypercomp/react` module provides the `useFilter` hook you can use to tie the lifetime of a dom-rendered filter to the lifetime of a component. This is most useful when targeting Safari, where data URLs for CSS filters are not supported.

```tsx
import { useFilter } from "hypercomp/react";

const MyComponent = () => {
  return (
    <div style={{ filter: useFilter(env.source.dilate(2)) }}>hello world</div>
  );
};
```

### Creating filters

You create filters by composing effects. They can be arbitrarily chained, provided as inputs to other effects, saved, reused, or compiled to an output using the `css` or `compile` functions.

Effect functions usually take 0-2 effect inputs, 0-1 effect arguments and an optional configuration object. Each configuration object takes at the minimum the `x`, `y`, `width`, and `height` properties to define the region of the filter effect, which is not documented individually here.

Each effect function is available both as top-level and chainable variants.
For example, `blur(input, 2)` and `input.blur(2)` are equivalent.

When you are done composing your filter, you can compile it or render it by passing it to the `compile` or `css` functions.

Optionally, you can wrap your effects in a `filter` call, which lets you specify the attributes of the rendered filter tag.

#### `filter(effect, attributes?)`

Lets you specify attributes of the rendered filter tag. This is optional, if you don't wrap your effect in a `filter` call, the behavior will depend on the render function you use.

- **effect**: The effect to wrap in the filter.
- **attributes**: (optional) SVG filter attributes.

### Environment constants

The `env` object provides constants representing the filter environment. You can use these as inputs to effect functions.

Example:

```tsx
flood("red").in(env.source); // Floods the source image with red.
```

- **`env.source`**: Represents `SourceGraphic`.
- **`env.sourceAlpha`**: Represents `SourceAlpha`.
- **`env.background`**: Represents `BackgroundImage`.
- **`env.backgroundAlpha`**: Represents `BackgroundAlpha`.
- **`env.fill`**: Represents `FillPaint`.
- **`env.stroke`**: Represents `StrokePaint`.

### Input functions

In addition to environment constants, you can also use the output of the following functions as inputs to effects.

#### `flood(color, config?)`

Applies a flood effect with the given color and opacity.

- **color**: `string` (optional) - The flood color.
- **config**: (optional) Configuration options.
  - **opacity**: `number` - Opacity of the flood effect.

#### `image(href, config?)`

Creates an image.

- **href**: `string` - URL of the image.
- **config**: (optional) Configuration options.

  - **preserveAspectRatio**: `string` - Aspect ratio handling.
  - **crossorigin**: `"anonymous" | "use-credentials"` - Cross-origin settings.

### Compositing functions

#### `merge(inputs, config?)`

Composites the provided inputs using the "over" operator.

- **inputs**: Array of inputs to merge.
- **config**: (optional) Configuration options.

#### `over(input1, input2, config?)`

Convenience method for compositing with the "over" operator.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `inside(input1, input2, config?)`

Convenience method for compositing with the "in" operator.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `out(input1, input2, config?)`

Convenience method for compositing with the "out" operator.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `xor(input1, input2, config?)`

Convenience method for compositing with the "xor" operator.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `atop(input1, input2, config?)`

Convenience method for compositing with the "atop" operator.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `arithmetic(input1, input2, config?)`

Convenience method for compositing with the "arithmetic" operator.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

  - **k1, k2, k3, k4**: `number` - Coefficients for the arithmetic operation.

### Common functions

#### `blur(input, stdDeviation, config?)`

Applies a Gaussian blur to the input.

- **input**: The input to blur.
- **stdDeviation**: `number` - Standard deviation of the blur.
- **config**: (optional) Configuration options.

#### `convolve(input, kernel, config?)`

Applies a convolution matrix to the input.

- **input**: The input to apply the convolution to.
- **kernel**: `number[]` - Kernel matrix values.
- **config**: (optional) Configuration options.

#### `displace(input1, input2, scale, config?)`

Displaces the input according to the displacement map.

- **input1**: The input to displace.
- **input2**: The displacement map.
- **scale**: `number` - Scale factor for displacement.
- **config**: (optional) Configuration options.

#### `offset(input, config?)`

Offsets the input.

- **input**: The input to offset.
- **config**: (optional) Configuration options.

#### `shadow(input, stdDeviation?, config?)`

Adds a drop shadow to the input.

- **input**: The input to apply the shadow to.
- **stdDeviation**: `number` (optional) - Standard deviation for the blur.
- **config**: (optional) Configuration options.

#### `tile(input, config?)`

Applies a tile effect to the input.

- **input**: The input to apply the tile effect to.
- **config**: (optional) Configuration options.

### Blending functions

#### `normal(input1, input2, config?)`

Blends two inputs using the "normal" mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `screen(input1, input2, config?)`

Blends two inputs using the screen mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `multiply(input1, input2, config?)`

Blends two inputs using the multiply mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `overlay(input1, input2, config?)`

Blends two inputs using the overlay mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `darken(input1, input2, config?)`

Blends two inputs using the darken mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `lighten(input1, input2, config?)`

Blends two inputs using the lighten mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `colorDodge(input1, input2, config?)`

Blends two inputs using the color dodge mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `colorBurn(input1, input2, config?)`

Blends two inputs using the color burn mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `hardLight(input1, input2, config?)`

Blends two inputs using the hard light mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `softLight(input1, input2, config?)`

Blends two inputs using the soft light mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `difference(input1, input2, config?)`

Blends two inputs using the difference mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `exclusion(input1, input2, config?)`

Blends two inputs using the exclusion mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `hue(input1, input2, config?)`

Blends two inputs using the hue mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `saturation(input1, input2, config?)`

Blends two inputs using the saturation mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `color(input1, input2, config?)`

Blends two inputs using the color mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

#### `luminosity(input1, input2, config?)`

Blends two inputs using the luminosity mode.

- **input1**: The top layer.
- **input2**: The bottom layer.
- **config**: (optional) Configuration options.

### Morphology functions

#### `dilate(input, radius, config?)`

Applies a dilation effect to the input.

- **input**: The input to dilate.
- **radius**: `number` - Radius for the effect.
- **config**: (optional) Configuration options.

#### `erode(input, radius, config?)`

Applies an erosion effect to the input.

- **input**: The input to erode.
- **radius**: `number` - Radius for the effect.
- **config**: (optional) Configuration options.

### Noise functions

#### `turbulence(frequency, config?)`

Generates a turbulence effect.

- **frequency**: `number` - Base frequency.
- **config**: (optional) Configuration options.
  - **octaves**: `number` - Number of octaves.
  - **seed**: `number` - Random seed value.
  - **stitch**: `"noStitch" | "stitch"` - Tile stitching mode.

#### `fractalNoise(frequency, config?)`

Convenience function for a fractal noise effect.

- **frequency**: `number` - Base frequency.
- **config**: (optional) Configuration options.
  - **octaves**: `number` - Number of octaves.
  - **seed**: `number` - Random seed value.
  - **stitch**: `"noStitch" | "stitch"` - Tile stitching mode.

### Color manipulation functions

#### `colorMatrix(input, matrix, config?)`

Applies a color matrix to the input.

- **input**: The input to apply the color matrix to.
- **matrix**: `number[]` - Matrix values.
- **config**: (optional) Configuration options.

#### `componentTransfer(input, config?)`

Applies a component transfer to the input.

- **input**: The input to apply the transfer to.
- **config**: (optional) Configuration options.

#### `hueRotate(input, angle, config?)`

Rotates the hue of the input.

- **input**: The input to rotate the hue of.
- **angle**: `number` - Angle of rotation.
- **config**: (optional) Configuration options.

#### `luminanceToAlpha(input, config?)`

Converts the luminance of the input to alpha.

- **input**: The input to convert.
- **config**: (optional) Configuration options.

#### `saturate(input, amount, config?)`

Saturates the input.

- **input**: The input to saturate.
- **amount**: `number` - Saturation amount.
- **config**: (optional) Configuration options.

### Lighting functions

Lighting functions take an input and a light source, and apply a lighting effect to the input.

Example:

```tsx
env.sourceAlpha.blur(1).specular(pointLight({ x: 460, y: 110, z: 680 }), {
  strength: 4,
  shininess: 20,
});
```

#### `specular(input, light, config?)`

Applies a specular lighting effect to the input. You should composite it using the `screen` blending mode.

- **input**: The input to apply the effect to.
- **light**: The light source to use.
- **config**: (optional) Configuration options.
  - **strength**: `number` - Specular strength.
  - **shininess**: `number` - Specular exponent.
  - **scale**: `number` - Surface scale.
  - **color**: `string` - Lighting color.

#### `diffuse(input, light, config?)`

Applies a diffuse lighting effect to the input. You should composite it using the `multiply` blending mode.

- **input**: The input to apply the effect to.
- **light**: The light source to use.
- **config**: (optional) Configuration options.
  - **strength**: `number` - Diffuse strength.
  - **scale**: `number` - Surface scale.
  - **color**: `string` - Lighting color.

The light source is defined using the following functions.

#### `pointLight(config)`

Creates a point light source.

- **x**: `number` - X coordinate.
- **y**: `number` - Y coordinate.
- **z**: `number` - Z coordinate.

#### `distantLight(config)`

Creates a distant light source.

- **azimuth**: `number` - Azimuth angle.
- **elevation**: `number` - Elevation angle.

#### `spotlight(config)`

Creates a spot light source.

- **x**: `number` - X coordinate.
- **y**: `number` - Y coordinate.
- **z**: `number` - Z coordinate.
- **pointsAtX**: `number` - X coordinate to point at.
- **pointsAtY**: `number` - Y coordinate to point at.
- **pointsAtZ**: `number` - Z coordinate to point at.
- **specularExponent**: `number` - Specular exponent.

## Contributing

Feel free to contribute by submitting issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
