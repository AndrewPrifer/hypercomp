import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { Node } from "./Node";
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

export class CompositeNode extends Node<
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

export function comp(
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

export function over(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return comp(node1, node2, { op: "over", ...config });
}

export function inside(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return comp(node1, node2, { op: "in", ...config });
}

export function out(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return comp(node1, node2, { op: "out", ...config });
}

export function atop(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return comp(node1, node2, { op: "atop", ...config });
}

export function xor(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return comp(node1, node2, { op: "xor", ...config });
}

export function arithmetic(
  node1: NodeAPI,
  node2: NodeAPI,
  config: ConvenienceCompositeConfig = {}
) {
  return comp(node1, node2, { op: "arithmetic", ...config });
}
