import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface BlurConfig extends BaseConfig {
  stdDeviation?: number;
  edgeMode?: "duplicate" | "wrap" | "none";
}

export interface ShorthandBlurConfig extends BaseConfig {
  r?: number;
  edgeMode?: "duplicate" | "wrap" | "none";
}

const keyMap = {
  r: "stdDeviation",
};

export class BlurNode extends AbstractNode<"blur", [INode], BlurConfig> {
  type = "blur" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feGaussianBlur in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Apply a Gaussian blur to the input node.
 *
 * @param node The node to blur.
 * @param config
 * @returns The blurred node.
 */
export function blur(node: NodeAPI, config: ShorthandBlurConfig = {}) {
  return new NodeAPI(
    new BlurNode({ input: [node[privateAPI]], config: mapKeys(config, keyMap) })
  );
}
