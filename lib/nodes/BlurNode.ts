import { privateAPI } from "../privateAPI";
import { BaseConfig } from "../types";
import { renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface BlurConfig extends BaseConfig {
  stdDeviation?: number;
  edgeMode?: "duplicate" | "wrap" | "none";
}

export interface ShorthandBlurConfig extends BaseConfig {
  edgeMode?: "duplicate" | "wrap" | "none";
}

export class BlurNode extends AbstractNode<"blur", [AbstractNode], BlurConfig> {
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
 * @param stdDeviation The standard deviation of the blur.
 * @param config
 * @returns The blurred node.
 */
export function blur(
  node: NodeAPI,
  stdDeviation: number,
  config: ShorthandBlurConfig = {}
) {
  return new NodeAPI(
    new BlurNode({
      input: [node[privateAPI]],
      config: { ...config, stdDeviation },
    })
  );
}
