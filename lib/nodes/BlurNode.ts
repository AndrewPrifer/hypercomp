import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { Node } from "./Node";
import { NodeAPI } from "../NodeAPI";

export interface BlurConfig extends BaseConfig {
  stdDeviation?: number;
}

export interface ShorthandBlurConfig extends BaseConfig {
  r?: number;
}

const keyMap = {
  r: "stdDeviation",
};

export class BlurNode extends Node<"blur", [INode], BlurConfig> {
  type = "blur" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feGaussianBlur in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

export function blur(node: NodeAPI, config: ShorthandBlurConfig = {}) {
  return new NodeAPI(
    new BlurNode({ input: [node[privateAPI]], config: mapKeys(config, keyMap) })
  );
}
