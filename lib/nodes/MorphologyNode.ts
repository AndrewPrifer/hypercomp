import { privateAPI } from "../privateAPI";
import { INode } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { Node } from "./Node";
import { NodeAPI } from "../NodeAPI";

export interface MorphologyConfig {
  operator?: "erode" | "dilate";
  radius?: number;
}

export interface ShorthandMorphologyConfig {
  op?: "erode" | "dilate";
  r?: number;
}

export type ConvenienceMorphologyConfig = Omit<ShorthandMorphologyConfig, "op">;

const keyMap = {
  op: "operator",
  r: "radius",
};

export class MorphologyNode extends Node<
  "morphology",
  [INode],
  MorphologyConfig
> {
  type = "morphology" as const;
  render() {
    const attrs = renderAttrs(this.config);
    return `<feMorphology in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Morph the input node according to the specified operator and radius.
 *
 * @param node The node to morph.
 * @param config
 * @returns The morphed node.
 */
export function morph(node: NodeAPI, config: ShorthandMorphologyConfig = {}) {
  return new NodeAPI(
    new MorphologyNode({
      input: [node[privateAPI]],
      config: mapKeys(config, keyMap),
    })
  );
}

/**
 * Erode the input node.
 *
 * @param node The node to erode.
 * @param config
 * @returns The eroded node.
 */
export function erode(node: NodeAPI, config: ConvenienceMorphologyConfig = {}) {
  return morph(node, { op: "erode", ...config });
}

/**
 * Dilate the input node.
 *
 * @param node The node to dilate.
 * @param config
 * @returns The dilated node.
 */
export function dilate(
  node: NodeAPI,
  config: ConvenienceMorphologyConfig = {}
) {
  return morph(node, { op: "dilate", ...config });
}
