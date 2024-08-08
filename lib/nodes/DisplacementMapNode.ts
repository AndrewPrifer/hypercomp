import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface DisplacementMapConfig extends BaseConfig {
  scale?: number;
  xChannelSelector?: "R" | "G" | "B" | "A";
  yChannelSelector?: "R" | "G" | "B" | "A";
}

export interface ShorthandDisplacementMapConfig extends BaseConfig {
  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";
}

const keyMap = {
  xChannel: "xChannelSelector",
  yChannel: "yChannelSelector",
};

export class DisplacementMapNode extends AbstractNode<
  "displacement-map",
  [INode, INode],
  DisplacementMapConfig
> {
  type = "displacement-map" as const;

  render() {
    const attrs = renderAttrs(this.config);

    return `<feDisplacementMap in="${this.input[0].id}" in2="${this.input[1].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Displace the input node according to the displacement map.
 *
 * @param node1 The node to displace.
 * @param node2 The displacement map.
 * @param scale The scale of the displacement.
 * @param config
 * @returns The displaced node.
 */
export function displace(
  node1: NodeAPI,
  node2: NodeAPI,
  scale: number,
  config: ShorthandDisplacementMapConfig = {}
) {
  return new NodeAPI(
    new DisplacementMapNode({
      input: [node1[privateAPI], node2[privateAPI]],
      config: mapKeys({ ...config, scale }, keyMap),
    })
  );
}
