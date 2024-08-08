import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs } from "../utils";
import { NodeAPI } from "../NodeAPI";
import { AbstractNode } from "./AbstractNode";

export interface BlendConfig extends BaseConfig {
  mode?:
    | "normal"
    | "multiply"
    | "screen"
    | "darken"
    | "lighten"
    | "overlay"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";
}

export type ShorthandBlendConfig = BlendConfig;

export type ConvenienceBlendConfig = Omit<ShorthandBlendConfig, "mode">;

export class BlendNode extends AbstractNode<
  "blend",
  [INode, INode],
  BlendConfig
> {
  type = "blend" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feBlend in="${this.input[0].id}" in2="${this.input[1].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Blend two nodes together according to the specified mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export function blend(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ShorthandBlendConfig = {}
) {
  return new NodeAPI(
    new BlendNode({
      input: [node1[privateAPI], node2[privateAPI]],
      config,
    })
  );
}

function creacteBlendFn(mode: BlendConfig["mode"]) {
  return (
    node1: NodeAPI,
    node2: NodeAPI,
    config: ConvenienceBlendConfig = {}
  ) => blend(node1, node2, { ...config, mode });
}

export const normal = creacteBlendFn("normal");

/**
 * Convenience method for blending two nodes with the "multiply" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const multiply = creacteBlendFn("multiply");

/**
 * Convenience method for blending two nodes with the "screen" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const screen = creacteBlendFn("screen");

/**
 * Convenience method for blending two nodes with the "darken" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const darken = creacteBlendFn("darken");

/**
 * Convenience method for blending two nodes with the "lighten" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const lighten = creacteBlendFn("lighten");

/**
 * Convenience method for blending two nodes with the "overlay" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const overlay = creacteBlendFn("overlay");

/**
 * Convenience method for blending two nodes with the "color-dodge" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const colorDodge = creacteBlendFn("color-dodge");

/**
 * Convenience method for blending two nodes with the "color-burn" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const colorBurn = creacteBlendFn("color-burn");

/**
 * Convenience method for blending two nodes with the "hard-light" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const hardLight = creacteBlendFn("hard-light");

/**
 * Convenience method for blending two nodes with the "soft-light" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const softLight = creacteBlendFn("soft-light");

/**
 * Convenience method for blending two nodes with the "difference" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const difference = creacteBlendFn("difference");

/**
 * Convenience method for blending two nodes with the "exclusion" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const exclusion = creacteBlendFn("exclusion");

/**
 * Convenience method for blending two nodes with the "hue" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const hue = creacteBlendFn("hue");

/**
 * Convenience method for blending two nodes with the "saturation" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const saturation = creacteBlendFn("saturation");

/**
 * Convenience method for blending two nodes with the "color" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const color = creacteBlendFn("color");

/**
 * Convenience method for blending two nodes with the "luminosity" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const luminosity = creacteBlendFn("luminosity");
