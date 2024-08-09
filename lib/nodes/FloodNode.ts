import { BaseConfig } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

export interface FloodConfig extends BaseConfig {
  "flood-color"?: string;
  "flood-opacity"?: number;
}

export interface ShorthandFloodConfig extends BaseConfig {
  color?: string;
  opacity?: number;
}

export type ConvenienceFloodConfig = Omit<ShorthandFloodConfig, "color">;

const keyMap = {
  color: "flood-color",
  opacity: "flood-opacity",
};

export class FloodNode extends AbstractNode<"flood", [], FloodConfig> {
  type = "flood" as const;

  render() {
    const attrs = renderAttrs(this.config);

    return `<feFlood result="${this.id}" ${attrs} />`;
  }
}

export function flood(color: string, config: ConvenienceFloodConfig = {}) {
  return new NodeAPI(
    new FloodNode({ input: [], config: mapKeys({ color, ...config }, keyMap) })
  );
}
