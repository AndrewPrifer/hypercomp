import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface MorphologyConfig {
  operator?: "erode" | "dilate";
  radius?: number;
}

export type ConvenienceMorphologyConfig = BaseConfig;

export class MorphologyNode extends AbstractNode<
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

function morph(node: NodeAPI, config: MorphologyConfig = {}) {
  return new NodeAPI(
    new MorphologyNode({
      input: [node[privateAPI]],
      config,
    })
  );
}

/**
 * Erode the input node.
 *
 * @param node The node to erode.
 * @param radius The radius of the erosion.
 * @param config
 * @returns The eroded node.
 */
export function erode(
  node: NodeAPI,
  radius: number,
  config: ConvenienceMorphologyConfig = {}
) {
  return morph(node, { operator: "erode", radius, ...config });
}

/**
 * Dilate the input node.
 *
 * @param node The node to dilate.
 * @param radius The radius of the dilation.
 * @param config
 * @returns The dilated node.
 */
export function dilate(
  node: NodeAPI,
  radius: number,
  config: ConvenienceMorphologyConfig = {}
) {
  return morph(node, { operator: "dilate", radius, ...config });
}
