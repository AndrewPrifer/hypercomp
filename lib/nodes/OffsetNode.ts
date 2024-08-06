import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs } from "../utils";
import { Node } from "./Node";

export interface OffsetConfig extends BaseConfig {
  dx?: number;
  dy?: number;
}

export type ShorthandOffsetConfig = OffsetConfig;

export class OffsetNode extends Node<"offset", [INode], OffsetConfig> {
  type = "offset" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feOffset in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

export function offset(node: NodeAPI, config: ShorthandOffsetConfig = {}) {
  return new NodeAPI(
    new OffsetNode({
      input: [node[privateAPI]],
      config,
    })
  );
}
