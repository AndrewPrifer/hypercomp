import { privateAPI } from "../privateAPI";
import { BaseConfig } from "../types";
import { renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { Effect } from "../Effect";

export interface TileConfig extends BaseConfig {}

export type ShorthandTileConfig = TileConfig;

export class TileNode extends AbstractNode<"tile", [AbstractNode], TileConfig> {
  type = "tile" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feTile in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

/**
 * Tile the input node.
 *
 * @param node The node to tile.
 * @param config
 * @returns The tiled node.
 */
export function tile(node: Effect, config: ShorthandTileConfig = {}) {
  return new Effect(new TileNode({ input: [node[privateAPI]], config }));
}
