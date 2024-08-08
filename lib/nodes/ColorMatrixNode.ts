import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs, mapKeys } from "../utils";
import { AbstractNode } from "./AbstractNode";

export interface ColorMatrixConfig extends BaseConfig {
  type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
  values?: string | number | number[];
}

export interface ShorthandColorMatrixConfig extends BaseConfig {
  type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
  values?: string | number | number[];
}

const colorMatrixKeyMap = {
  values: "values",
};

export class ColorMatrixNode extends AbstractNode<
  "color-matrix",
  [INode],
  ColorMatrixConfig
> {
  type = "color-matrix" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feColorMatrix in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Apply a color matrix to the input node.
 *
 * @param node The node to apply the color matrix to.
 * @param config
 * @returns The node with the color matrix applied.
 */
export function colorMatrix(
  node: NodeAPI,
  config: ShorthandColorMatrixConfig = {}
) {
  return new NodeAPI(
    new ColorMatrixNode({
      input: [node[privateAPI]],
      config: mapKeys(config, colorMatrixKeyMap),
    })
  );
}
