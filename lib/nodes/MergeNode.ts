import { privateAPI } from "../privateAPI";
import { BaseConfig } from "../types";
import { renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface MergeConfig extends BaseConfig {}

export type ShorthandMergeConfig = MergeConfig;

export class MergeNode extends AbstractNode<
  "merge",
  AbstractNode[],
  MergeConfig
> {
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

/**
 * Merge multiple nodes into one. The merged nodes will be rendered on top of each other.
 *
 * @param nodes The nodes to merge.
 * @param config
 * @returns The merged node.
 */
export function merge(nodes: NodeAPI[], config: ShorthandMergeConfig = {}) {
  return new NodeAPI(
    new MergeNode({ input: nodes.map((n) => n[privateAPI]), config })
  );
}
