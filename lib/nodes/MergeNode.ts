import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs } from "../utils";
import { Node } from "./Node";
import { NodeAPI } from "../NodeAPI";

export interface MergeConfig extends BaseConfig {}

export type ShorthandMergeConfig = MergeConfig;

export class MergeNode extends Node<"merge", INode[], MergeConfig> {
  type = "merge" as const;
  render() {
    const attrs = renderAttrs(this.config);

    return `<feMerge result="${this.id}" ${attrs}>
        ${this.input
          .map((node) => `<feMergeNode in="${node.id}" />`)
          .join("\n")}
      </feMerge>`;
  }
}

export function merge(nodes: NodeAPI[], config: ShorthandMergeConfig = {}) {
  return new NodeAPI(
    new MergeNode({ input: nodes.map((n) => n[privateAPI]), config })
  );
}
