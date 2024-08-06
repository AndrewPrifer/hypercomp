import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs } from "../utils";
import { Node } from "./Node";
import { NodeAPI } from "../NodeAPI";

export interface TileConfig extends BaseConfig {}

export type ShorthandTileConfig = TileConfig;

export class TileNode extends Node<"tile", [INode], TileConfig> {
  type = "tile" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feTile in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

export function tile(node: NodeAPI, config: ShorthandTileConfig = {}) {
  return new NodeAPI(new TileNode({ input: [node[privateAPI]], config }));
}
