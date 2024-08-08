import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface CompositeConfig extends BaseConfig {
  operator?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic";
  k1?: number;
  k2?: number;
  k3?: number;
  k4?: number;
}

export interface ShorthandCompositeConfig extends BaseConfig {
  op?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic";
  k1?: number;
  k2?: number;
  k3?: number;
  k4?: number;
}

export type ConvenienceCompositeConfig = Omit<ShorthandCompositeConfig, "op">;

const keyMap = {
  op: "operator",
};

export class CompositeNode extends AbstractNode<
  "composite",
  [INode, INode],
  CompositeConfig
> {
  type = "composite" as const;

  render() {
    const attrs = renderAttrs(this.config);

    return `<feComposite in="${this.input[0].id}" in2="${this.input[1].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Composite two nodes together according to the specified operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function composite(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ShorthandCompositeConfig = {}
) {
  return new NodeAPI(
    new CompositeNode({
      input: [node1[privateAPI], node2[privateAPI]],
      config: mapKeys(config, keyMap),
    })
  );
}

/**
 * Convenience method for compositing two nodes with the "over" operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function over(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return composite(node1, node2, { op: "over", ...config });
}

/**
 * Convenience method for compositing two nodes with the "in" operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function inside(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return composite(node1, node2, { op: "in", ...config });
}

/**
 * Convenience method for compositing two nodes with the "out" operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function out(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return composite(node1, node2, { op: "out", ...config });
}

/**
 * Convenience method for compositing two nodes with the "atop" operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function atop(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return composite(node1, node2, { op: "atop", ...config });
}

/**
 * Convenience method for compositing two nodes with the "xor" operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function xor(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return composite(node1, node2, { op: "xor", ...config });
}

/**
 * Convenience method for compositing two nodes with the "arithmetic" operator.
 *
 * @param node1 The top layer.
 * @param node2 The bottom layer.
 * @param config
 * @returns The composited node.
 */
export function arithmetic(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return composite(node1, node2, { op: "arithmetic", ...config });
}
