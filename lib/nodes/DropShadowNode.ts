import { Effect } from "../Effect";
import { privateAPI } from "../privateAPI";
import { BaseConfig } from "../types";
import { renderAttrs, mapKeys } from "../utils";
import { AbstractNode } from "./AbstractNode";

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
  color?: string;
  opacity?: number;
}

const dropShadowKeyMap = {
  dx: "dx",
  dy: "dy",
  color: "flood-color",
  opacity: "flood-opacity",
};

export class DropShadowNode extends AbstractNode<
  "drop-shadow",
  [AbstractNode],
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
 * @param stdDeviation The standard deviation of the shadow blur.
 * @param config
 * @returns The node with the drop shadow applied.
 */
export function shadow(
  node: Effect,
  stdDeviation: number = 2,
  config: ShorthandDropShadowConfig = {}
) {
  return new Effect(
    new DropShadowNode({
      input: [node[privateAPI]],
      config: mapKeys({ ...config, stdDeviation }, dropShadowKeyMap),
    })
  );
}
