import { privateAPI } from "./privateAPI";
import { blur, ShorthandBlurConfig } from "./nodes/BlurNode";
import {
  arithmetic,
  atop,
  ConvenienceCompositeConfig,
  inside,
  out,
  over,
  xor,
} from "./nodes/CompositeNode";
import {
  displace,
  ShorthandDisplacementMapConfig,
} from "./nodes/DisplacementMapNode";
import { merge } from "./nodes/MergeNode";
import {
  ConvenienceMorphologyConfig,
  dilate,
  erode,
} from "./nodes/MorphologyNode";
import {
  ConvenienceBlendConfig,
  normal,
  multiply,
  screen,
  darken,
  lighten,
  overlay,
  colorDodge,
  colorBurn,
  hardLight,
  softLight,
  difference,
  exclusion,
  hue,
  saturation,
  color,
  luminosity,
} from "./nodes/BlendNode";
import {
  colorMatrix,
  saturate,
  hueRotate,
  luminanceToAlpha,
  ShorthandColorMatrixConfig,
} from "./nodes/ColorMatrixNode";
import {
  componentTransfer,
  ShorthandComponentTransferConfig,
} from "./nodes/ComponentTransferNode";
import {
  convolve,
  ShorthandConvolveMatrixConfig,
} from "./nodes/ConvolveMatrixNode";
import { shadow, ShorthandDropShadowConfig } from "./nodes/DropShadowNode";
import { offset, ShorthandOffsetConfig } from "./nodes/OffsetNode";
import { ShorthandTileConfig, tile } from "./nodes/TileNode";
import {
  diffuse,
  ShorthandDiffuseLightingConfig,
} from "./nodes/DiffuseLightingNode";
import {
  ShorthandSpecularLightingConfig,
  specular,
} from "./nodes/SpecularLightingNode";
import { filter, SVGFilterAttributes } from "./Filter";
import { PointLight } from "./lights/PointLight";
import { DistantLight } from "./lights/DistantLight";
import { Spotlight } from "./lights/Spotlight";
import { AbstractNode } from "./nodes/AbstractNode";
import { flood } from "./nodes/FloodNode";
import { image } from "./nodes/ImageNode";
import { fractalNoise, turbulence } from "./nodes/TurbulenceNode";
import { constant } from "./nodes/ConstantNode";

export class Effect<T extends AbstractNode = AbstractNode> {
  [privateAPI]: T;

  constructor(node: T) {
    this[privateAPI] = node;
  }

  static flood = flood;
  static image = image;
  static merge = merge;

  static turbulence = turbulence;
  static fractalNoise = fractalNoise;

  /**
   * The source graphic.
   */
  static get source() {
    return constant("SourceGraphic");
  }

  /**
   * The source alpha channel.
   */
  static get sourceAlpha() {
    return constant("SourceAlpha");
  }

  /**
   * The background graphic.
   */
  static get background() {
    return constant("BackgroundImage");
  }

  /**
   * The background alpha channel.
   */
  static get backgroundAlpha() {
    return constant("BackgroundAlpha");
  }

  /**
   * The fill paint.
   */
  static get fill() {
    return constant("FillPaint");
  }

  /**
   * The stroke paint.
   */
  static get stroke() {
    return constant("StrokePaint");
  }

  /**
   * Create a new filter out of this effect.
   *
   * @param attributes Additional attributes for the filter element.
   * @returns The filter API.
   */
  filter(attributes: SVGFilterAttributes = {}) {
    return filter(this, attributes);
  }

  /**
   * Apply a Gaussian blur to the effect.
   *
   * @param stdDeviation The standard deviation of the blur.
   * @param config
   * @returns The blurred effect.
   */
  blur(stdDeviation: number, config: ShorthandBlurConfig = {}) {
    return blur(this, stdDeviation, config);
  }

  /**
   * Apply a color matrix to the effect.
   *
   * @param matrix The values of the color matrix.
   * @param config
   * @returns The effect with the color matrix applied.
   */
  colorMatrix(matrix: number[], config: ShorthandColorMatrixConfig = {}) {
    return colorMatrix(this, matrix, config);
  }

  /**
   * Apply saturation to the effect.
   */
  saturate(value: number, config: ShorthandColorMatrixConfig = {}) {
    return saturate(this, value, config);
  }

  /**
   * Rotate the hue of the effect.
   *
   * @param angle The angle of the hue rotation.
   * @param config
   * @returns The effect with the hue rotated.
   */
  hueRotate(angle: number, config: ShorthandColorMatrixConfig = {}) {
    return hueRotate(this, angle, config);
  }

  /**
   * Convert the luminance of the effect to alpha.
   *
   * @param config
   * @returns The effect with the luminance converted to alpha.
   */
  luminanceToAlpha(config: ShorthandColorMatrixConfig = {}) {
    return luminanceToAlpha(this, config);
  }

  /**
   * Apply a component transfer to the effect.
   *
   * @param config
   * @returns The effect with the component transfer applied.
   */
  componentTransfer(config: ShorthandComponentTransferConfig = {}) {
    return componentTransfer(this, config);
  }

  /**
   * Apply a convolution matrix to the effect.
   *
   * @param kernel The convolution matrix.
   * @param config
   * @returns The effect with the convolution matrix applied.
   */
  convolve(kernel: number[], config: ShorthandConvolveMatrixConfig = {}) {
    return convolve(this, kernel, config);
  }

  /**
   * Apply a diffuse lighting effect to the effect.
   *
   * @param light The light source.
   * @param config
   * @returns The effect with the diffuse lighting effect applied.
   */
  diffuse(
    light: PointLight | DistantLight | Spotlight,
    config: ShorthandDiffuseLightingConfig = {}
  ) {
    return diffuse(this, light, config);
  }

  /**
   * Apply a displacement map to the effect.
   *
   * @param effect The displacement map.
   * @param scale The scale of the displacement.
   * @param config
   * @returns The effect with the displacement map applied.
   */
  displace(
    effect: Effect,
    scale: number,
    config: ShorthandDisplacementMapConfig = {}
  ) {
    return displace(this, effect, scale, config);
  }

  /**
   * Apply an offset to the effect.
   *
   * @param config
   * @returns The effect with the offset applied.
   */
  offset(config: ShorthandOffsetConfig = {}) {
    return offset(this, config);
  }

  /**
   * Apply a drop shadow to the effect.
   *
   * @param stdDeviation The standard deviation of the shadow.
   * @param config
   * @returns The effect with the drop shadow applied.
   */
  shadow(stdDeviation: number, config: ShorthandDropShadowConfig = {}) {
    return shadow(this, stdDeviation, config);
  }

  /**
   * Apply a specular lighting effect to the effect.
   *
   * @param light The light source.
   * @param config
   * @returns The effect with the specular lighting effect applied.
   */
  specular(
    light: PointLight | DistantLight | Spotlight,
    config: ShorthandSpecularLightingConfig = {}
  ) {
    return specular(this, light, config);
  }

  /**
   * Apply a tile effect to the effect.
   *
   * @param config
   * @returns The effect with the tile effect applied.
   */
  tile(config: ShorthandTileConfig = {}) {
    return tile(this, config);
  }

  /**
   * Composite this effect over another effect.
   *
   * @param effect The effect to composite over.
   * @param config
   * @returns The composited effect.
   */
  over(effect: Effect, config: ConvenienceCompositeConfig = {}) {
    return over(this, effect, config);
  }

  /**
   * Composite this effect inside another effect.
   *
   * @param effect The effect to composite inside.
   * @param config
   * @returns The composited effect.
   */
  in(effect: Effect, config: ConvenienceCompositeConfig = {}) {
    return inside(this, effect, config);
  }

  /**
   * Composite this effect out of another effect.
   *
   * @param effect The effect to composite out of.
   * @param config
   * @returns The composited effect.
   */
  out(effect: Effect, config: ConvenienceCompositeConfig = {}) {
    return out(this, effect, config);
  }

  /**
   * Composite this effect atop another effect.
   *
   * @param effect The effect to composite atop.
   * @param config
   * @returns The composited effect.
   */
  atop(effect: Effect, config: ConvenienceCompositeConfig = {}) {
    return atop(this, effect, config);
  }

  /**
   * Composite this effect with another effect using the XOR operator.
   *
   * @param effect The effect to composite with.
   * @param config
   * @returns The composited effect.
   */
  xor(effect: Effect, config: ConvenienceCompositeConfig = {}) {
    return xor(this, effect, config);
  }

  /**
   * Apply an arithmetic operation to the effect.
   *
   * @param effect The effect to perform the operation on.
   * @param config
   * @returns The effect with the arithmetic operation applied.
   */
  arithmetic(
    effect: Effect,
    config: ConvenienceCompositeConfig & {
      k1?: number;
      k2?: number;
      k3?: number;
      k4?: number;
    } = {}
  ) {
    return arithmetic(this, effect, config);
  }

  /**
   * Erode the effect.
   *
   * @param radius The radius of the erosion.
   * @param config
   * @returns The eroded effect.
   */
  erode(radius: number, config: ConvenienceMorphologyConfig = {}) {
    return erode(this, radius, config);
  }

  /**
   * Dilate the effect.
   *
   * @param radius The radius of the dilation.
   * @param config
   * @returns The dilated effect.
   */
  dilate(radius: number, config: ConvenienceMorphologyConfig = {}) {
    return dilate(this, radius, config);
  }

  /**
   * Blend this effect with another effect using the normal mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  normal(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return normal(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the multiply mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  multiply(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return multiply(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the screen mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  screen(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return screen(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the darken mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  darken(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return darken(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the lighten mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  lighten(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return lighten(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the overlay mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  overlay(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return overlay(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the color dodge mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  colorDodge(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return colorDodge(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the color burn mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  colorBurn(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return colorBurn(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the hard light mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  hardLight(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return hardLight(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the soft light mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  softLight(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return softLight(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the difference mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  difference(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return difference(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the exclusion mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  exclusion(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return exclusion(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the hue mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  hue(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return hue(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the saturation mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  saturation(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return saturation(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the color mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  color(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return color(this, effect, config);
  }

  /**
   * Blend this effect with another effect using the luminosity mode.
   *
   * @param effect The effect to blend with.
   * @param config
   * @returns The blended effect.
   */
  luminosity(effect: Effect, config: ConvenienceBlendConfig = {}) {
    return luminosity(this, effect, config);
  }
}
