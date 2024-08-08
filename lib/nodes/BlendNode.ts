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

/**
 * Convenience method for blending two nodes with the "screen" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export function screen(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceBlendConfig = {}
) {
  return blend(node1, node2, { ...config, mode: "screen" });
}

/**
 * Convenience method for blending two nodes with the "multiply" mode.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The blended node.
 */
export function multiply(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceBlendConfig = {}
) {
  return blend(node1, node2, { ...config, mode: "multiply" });
}
