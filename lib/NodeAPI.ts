import { privateAPI } from "./privateAPI";
import { INode } from "./types";
import { blur, ShorthandBlurConfig } from "./nodes/BlurNode";
import {
  arithmetic,
  atop,
  comp,
  ConvenienceCompositeConfig,
  inside,
  out,
  over,
  ShorthandCompositeConfig,
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
  morph,
  ShorthandMorphologyConfig,
} from "./nodes/MorphologyNode";
import {
  blend,
  ConvenienceBlendConfig,
  multiply,
  screen,
  ShorthandBlendConfig,
} from "./nodes/BlendNode";
import {
  colorMatrix,
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
  diffuseLight,
  ShorthandDiffuseLightingConfig,
} from "./nodes/DiffuseLightingNode";
import {
  ShorthandSpecularLightingConfig,
  specularLight,
} from "./nodes/SpecularLightingNode";
import {
  ConvenienceTurbulenceConfig,
  fractalNoise,
} from "./nodes/TurbulenceNode";

export class NodeAPI<T extends INode = INode> {
  [privateAPI]: T;

  constructor(node: T) {
    this[privateAPI] = node;
  }

  blend(node: NodeAPI, config: ShorthandBlendConfig = {}) {
    return blend(this, node, config);
  }

  blur(config: ShorthandBlurConfig = {}) {
    return blur(this, config);
  }

  colorMatrix(config: ShorthandColorMatrixConfig = {}) {
    return colorMatrix(this, config);
  }

  comp(node: NodeAPI, config: ShorthandCompositeConfig = {}) {
    return comp(this, node, config);
  }

  componentTransfer(config: ShorthandComponentTransferConfig = {}) {
    return componentTransfer(this, config);
  }

  convolve(config: ShorthandConvolveMatrixConfig = {}) {
    return convolve(this, config);
  }

  diffuseLight(
    config: ShorthandDiffuseLightingConfig = { light: { type: "point" } }
  ) {
    return diffuseLight(this, config);
  }

  displace(node: NodeAPI, config: ShorthandDisplacementMapConfig = {}) {
    return displace(this, node, config);
  }

  merge(nodes: NodeAPI[] | NodeAPI, config: ShorthandMergeConfig = {}) {
    return merge([this, ...(Array.isArray(nodes) ? nodes : [nodes])], config);
  }

  morph(config: ShorthandMorphologyConfig = {}) {
    return morph(this, config);
  }

  offset(config: ShorthandOffsetConfig = {}) {
    return offset(this, config);
  }

  shadow(config: ShorthandDropShadowConfig = {}) {
    return shadow(this, config);
  }

  specularLight(
    config: ShorthandSpecularLightingConfig = { light: { type: "point" } }
  ) {
    return specularLight(this, config);
  }

  tile(config: ShorthandTileConfig = {}) {
    return tile(this, config);
  }

  over(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return over(this, node, config);
  }

  in(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return inside(this, node, config);
  }

  out(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return out(this, node, config);
  }

  atop(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return atop(this, node, config);
  }

  xor(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return xor(this, node, config);
  }

  arithmetic(node: NodeAPI, config: ConvenienceCompositeConfig = {}) {
    return arithmetic(this, node, config);
  }

  fractalNoise(config: ConvenienceTurbulenceConfig = {}) {
    return fractalNoise(config);
  }

  screen(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return screen(this, node, config);
  }

  multiply(node: NodeAPI, config: ConvenienceBlendConfig = {}) {
    return multiply(this, node, config);
  }

  erode(config: ConvenienceMorphologyConfig = {}) {
    return erode(this, config);
  }

  dilate(config: ConvenienceMorphologyConfig = {}) {
    return dilate(this, config);
  }
}
