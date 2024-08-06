import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs, mapKeys } from "../utils";
import { Node } from "./Node";

export interface ColorMatrixConfig extends BaseConfig {
  type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
  values?: string | number | number[];
}

export interface ShorthandColorMatrixConfig extends BaseConfig {
  type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
  v?: string | number;
}

const colorMatrixKeyMap = {
  v: "values",
};

export class ColorMatrixNode extends Node<
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
