import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs, mapKeys } from "../utils";
import { AbstractNode } from "./AbstractNode";

export interface ConvolveMatrixConfig extends BaseConfig {
  order?: number;
  kernelMatrix?: string | number[];
  divisor?: number;
  bias?: number;
  targetX?: number;
  targetY?: number;
  edgeMode?: "duplicate" | "wrap" | "none";
  preserveAlpha?: boolean;
}

export interface ShorthandConvolveMatrixConfig
  extends Omit<ConvolveMatrixConfig, "kernelMatrix"> {}

export class ConvolveMatrixNode extends AbstractNode<
  "convolve-matrix",
  [INode],
  ConvolveMatrixConfig
> {
  type = "convolve-matrix" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feConvolveMatrix in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Apply a convolution matrix to the input node.
 *
 * @param node The node to apply the convolution matrix to.
 * @param kernel The convolution matrix to apply.
 * @param config
 * @returns The node with the convolution matrix applied.
 */
export function convolve(
  node: NodeAPI,
  kernel: number[],
  config: ShorthandConvolveMatrixConfig = {}
) {
  return new NodeAPI(
    new ConvolveMatrixNode({
      input: [node[privateAPI]],
      config: { ...config, kernelMatrix: kernel },
    })
  );
}
