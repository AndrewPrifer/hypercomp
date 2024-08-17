import { privateAPI } from "../privateAPI";
import { BaseConfig } from "../types";
import { renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { Effect } from "../Effect";

export interface MorphologyConfig {
  operator?: "erode" | "dilate";
  radius?: number;
}

export type ConvenienceMorphologyConfig = BaseConfig;

export class MorphologyNode extends AbstractNode<
  "morphology",
  [AbstractNode],
  MorphologyConfig
> {
  type = "morphology" as const;
  render() {
    const attrs = renderAttrs(this.config);
    return `<feMorphology in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

function morph(node: Effect, config: MorphologyConfig = {}) {
  return new Effect(
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
  node: Effect,
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
  node: Effect,
  radius: number,
  config: ConvenienceMorphologyConfig = {}
) {
  return morph(node, { operator: "dilate", radius, ...config });
}
