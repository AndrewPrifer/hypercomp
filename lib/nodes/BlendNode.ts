import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs } from "../utils";
import { NodeAPI } from "../NodeAPI";
import { Node } from "./Node";

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

export class BlendNode extends Node<"blend", [INode, INode], BlendConfig> {
  type = "blend" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feBlend in="${this.input[0].id}" in2="${this.input[1].id}" result="${this.id}" ${attrs} />`;
  }
}

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

export function screen(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceBlendConfig = {}
) {
  return blend(node1, node2, { ...config, mode: "screen" });
}

export function multiply(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceBlendConfig = {}
) {
  return blend(node1, node2, { ...config, mode: "multiply" });
}
