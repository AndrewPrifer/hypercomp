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

function blend(
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

/**
 * Blends the two nodes using the "normal" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const normal = creacteBlendFn("normal");

/**
 * Blends the two nodes using the "multiply" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const multiply = creacteBlendFn("multiply");

/**
 * Blends the two nodes using the "screen" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const screen = creacteBlendFn("screen");

/**
 * Blends the two nodes using the "darken" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const darken = creacteBlendFn("darken");

/**
 * Blends the two nodes using the "lighten" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const lighten = creacteBlendFn("lighten");

/**
 * Blends the two nodes using the "overlay" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const overlay = creacteBlendFn("overlay");

/**
 * Blends the two nodes using the "color-dodge" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const colorDodge = creacteBlendFn("color-dodge");

/**
 * Blends the two nodes using the "color-burn" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const colorBurn = creacteBlendFn("color-burn");

/**
 * Blends the two nodes using the "hard-light" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const hardLight = creacteBlendFn("hard-light");

/**
 * Blends the two nodes using the "soft-light" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const softLight = creacteBlendFn("soft-light");

/**
 * Blends the two nodes using the "difference" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const difference = creacteBlendFn("difference");

/**
 * Blends the two nodes using the "exclusion" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const exclusion = creacteBlendFn("exclusion");

/**
 * Blends the two nodes using the "hue" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const hue = creacteBlendFn("hue");

/**
 * Blends the two nodes using the "saturation" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const saturation = creacteBlendFn("saturation");

/**
 * Blends the two nodes using the "color" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const color = creacteBlendFn("color");

/**
 * Blends the two nodes using the "luminosity" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export const luminosity = creacteBlendFn("luminosity");
