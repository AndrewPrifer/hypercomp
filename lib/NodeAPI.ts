import { privateAPI } from "./privateAPI";
import { INode } from "./types";
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
import { merge, ShorthandMergeConfig } from "./nodes/MergeNode";
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

export class NodeAPI<T extends INode = INode> {
  [privateAPI]: T;

  constructor(node: T) {
    this[privateAPI] = node;
  }

  /**
   * Create a new filter out of this node.
   *
   * @param attributes Additional attributes for the filter element.
   * @returns The filter API.
   */
  filter(attributes: SVGFilterAttributes = {}) {
    return filter(this, attributes);
  }

  /**
   * Apply a Gaussian blur to the node.
   *
   * @param stdDeviation The standard deviation of the blur.
   * @param config
   * @returns The blurred node.
   */
  blur(stdDeviation: number, config: ShorthandBlurConfig = {}) {
    return blur(this, stdDeviation, config);
  }

  /**
   * Apply a color matrix to the node.
   *
   * @param matrix The values of the color matrix.
   * @param config
   * @returns The node with the color matrix applied.
   */
  colorMatrix(matrix: number[], config: ShorthandColorMatrixConfig = {}) {
    return colorMatrix(this, matrix, config);
  }

  /**
   * Apply saturation to the node.
   */
  saturate(value: number, config: ShorthandColorMatrixConfig = {}) {
    return saturate(this, value, config);
  }

  /**
   * Rotate the hue of the node.
   *
   * @param angle The angle of the hue rotation.
   * @param config
   * @returns The node with the hue rotated.
   */
  hueRotate(angle: number, config: ShorthandColorMatrixConfig = {}) {
    return hueRotate(this, angle, config);
  }

  /**
   * Convert the luminance of the node to alpha.
   *
   * @param config
   * @returns The node with the luminance converted to alpha.
   */
  luminanceToAlpha(config: ShorthandColorMatrixConfig = {}) {
    return luminanceToAlpha(this, config);
  }

  /**
   * Apply a component transfer to the node.
   *
   * @param config
   * @returns The node with the component transfer applied.
   */
  componentTransfer(config: ShorthandComponentTransferConfig = {}) {
    return componentTransfer(this, config);
  }

  /**
   * Apply a convolution matrix to the node.
   *
   * @param kernel The convolution matrix.
   * @param config
   * @returns The node with the convolution matrix applied.
   */
  convolve(kernel: number[], config: ShorthandConvolveMatrixConfig = {}) {
    return convolve(this, kernel, config);
  }

  /**
   * Apply a diffuse lighting effect to the node.
   *
   * @param light The light source.
   * @param config
   * @returns The node with the diffuse lighting effect applied.
   */
  diffuse(
    light: PointLight | DistantLight | Spotlight,
    config: ShorthandDiffuseLightingConfig = {}
  ) {
    return diffuse(this, light, config);
  }

  /**
   * Apply a displacement map to the node.
   *
   * @param node The displacement map.
   * @param scale The scale of the displacement.
   * @param config
   * @returns The node with the displacement map applied.
   */
  displace(
    node: NodeAPI,
    scale: number,
    config: ShorthandDisplacementMapConfig = {}
  ) {
    return displace(this, node, scale, config);
  }

  /**
   * Merge this node with other nodes. The nodes are composited on top of each other.
   *
   * @param nodes The nodes to merge with.
   * @param config
   * @returns The merged node.
   */
  merge(nodes: NodeAPI[] | NodeAPI, config: ShorthandMergeConfig = {}) {
    return merge([this, ...(Array.isArray(nodes) ? nodes : [nodes])], config);
  }

  /**
   * Apply an offset to the node.
   *
   * @param config
   * @returns The node with the offset applied.
   */
  offset(config: ShorthandOffsetConfig = {}) {
    return offset(this, config);
  }

  /**
   * Apply a drop shadow to the node.
   *
   * @param stdDeviation The standard deviation of the shadow.
   * @param config
   * @returns The node with the drop shadow applied.
   */
  shadow(stdDeviation: number, config: ShorthandDropShadowConfig = {}) {
    return shadow(this, stdDeviation, config);
  }

  /**
   * Apply a specular lighting effect to the node.
   *
   * @param light The light source.
   * @param config
   * @returns The node with the specular lighting effect applied.
   */
  specular(
    light: PointLight | DistantLight | Spotlight,
    config: ShorthandSpecularLightingConfig = {}
  ) {
    return specular(this, light, config);
  }

  /**
   * Apply a tile effect to the node.
   *
   * @param config
   * @returns The node with the tile effect applied.
   */
  tile(config: ShorthandTileConfig = {}) {
    return tile(this, config);
  }

  /**
   * Composite this node over another node.
   *
   * @param node The node to composite over.
   * @param config
   * @returns The composited node.
   */
  over(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return over(this, node, config);
  }

  /**
   * Composite this node inside another node.
   *
   * @param node The node to composite inside.
   * @param config
   * @returns The composited node.
   */
  in(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return inside(this, node, config);
  }

  /**
   * Composite this node out of another node.
   *
   * @param node The node to composite out of.
   * @param config
   * @returns The composited node.
   */
  out(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return out(this, node, config);
  }

  /**
   * Composite this node atop another node.
   *
   * @param node The node to composite atop.
   * @param config
   * @returns The composited node.
   */
  atop(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return atop(this, node, config);
  }

  /**
   * Composite this node with another node using the XOR operator.
   *
   * @param node The node to composite with.
   * @param config
   * @returns The composited node.
   */
  xor(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return xor(this, node, config);
  }

  /**
   * Apply an arithmetic operation to the node.
   *
   * @param node The node to perform the operation on.
   * @param config
   * @returns The node with the arithmetic operation applied.
   */
  arithmetic(
    node: NodeAPI,
    config: ConvenienceCompositeConfig & {
      k1?: number;
      k2?: number;
      k3?: number;
      k4?: number;
    } = {}
  ) {
    return arithmetic(this, node, config);
  }

  /**
   * Erode the node.
   *
   * @param radius The radius of the erosion.
   * @param config
   * @returns The eroded node.
   */
  erode(radius: number, config: ConvenienceMorphologyConfig = {}) {
    return erode(this, radius, config);
  }

  /**
   * Dilate the node.
   *
   * @param radius The radius of the dilation.
   * @param config
   * @returns The dilated node.
   */
  dilate(radius: number, config: ConvenienceMorphologyConfig = {}) {
    return dilate(this, radius, config);
  }

  /**
   * Blend this node with another node using the normal mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  normal(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return normal(this, node, config);
  }

  /**
   * Blend this node with another node using the multiply mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  multiply(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return multiply(this, node, config);
  }

  /**
   * Blend this node with another node using the screen mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  screen(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return screen(this, node, config);
  }

  /**
   * Blend this node with another node using the darken mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  darken(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return darken(this, node, config);
  }

  /**
   * Blend this node with another node using the lighten mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  lighten(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return lighten(this, node, config);
  }

  /**
   * Blend this node with another node using the overlay mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  overlay(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return overlay(this, node, config);
  }

  /**
   * Blend this node with another node using the color dodge mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  colorDodge(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return colorDodge(this, node, config);
  }

  /**
   * Blend this node with another node using the color burn mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  colorBurn(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return colorBurn(this, node, config);
  }

  /**
   * Blend this node with another node using the hard light mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  hardLight(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return hardLight(this, node, config);
  }

  /**
   * Blend this node with another node using the soft light mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  softLight(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return softLight(this, node, config);
  }

  /**
   * Blend this node with another node using the difference mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  difference(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return difference(this, node, config);
  }

  /**
   * Blend this node with another node using the exclusion mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  exclusion(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return exclusion(this, node, config);
  }

  /**
   * Blend this node with another node using the hue mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  hue(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return hue(this, node, config);
  }

  /**
   * Blend this node with another node using the saturation mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  saturation(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return saturation(this, node, config);
  }

  /**
   * Blend this node with another node using the color mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  color(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return color(this, node, config);
  }

  /**
   * Blend this node with another node using the luminosity mode.
   *
   * @param node The node to blend with.
   * @param config
   * @returns The blended node.
   */
  luminosity(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return luminosity(this, node, config);
  }
}
