import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs, mapKeys } from "../utils";
import { Node } from "./Node";

export interface DropShadowConfig extends BaseConfig {
  dx?: number;
  dy?: number;
  stdDeviation?: number;
  "flood-color"?: string;
  "flood-opacity"?: number;
}

export interface ShorthandDropShadowConfig extends BaseConfig {
  dx?: number;
  dy?: number;
  r?: number;
  color?: string;
  opacity?: number;
}

const dropShadowKeyMap = {
  dx: "dx",
  dy: "dy",
  sd: "stdDeviation",
  color: "flood-color",
  opacity: "flood-opacity",
};

export class DropShadowNode extends Node<
  "drop-shadow",
  [INode],
  DropShadowConfig
> {
  type = "drop-shadow" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feDropShadow in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Apply a drop shadow to the input node.
 *
 * @param node The node to apply the drop shadow to.
 * @param config
 * @returns The node with the drop shadow applied.
 */
export function shadow(node: NodeAPI, config: ShorthandDropShadowConfig = {}) {
  return new NodeAPI(
    new DropShadowNode({
      input: [node[privateAPI]],
      config: mapKeys(config, dropShadowKeyMap),
    })
  );
}
