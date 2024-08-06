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

export function morph(node: NodeAPI, config: ShorthandMorphologyConfig = {}) {
  return new NodeAPI(
    new MorphologyNode({
      input: [node[privateAPI]],
      config: mapKeys(config, keyMap),
    })
  );
}
