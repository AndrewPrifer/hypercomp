import { BaseConfig } from "../types";
import { mapKeys, renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

interface TurbulenceConfig extends BaseConfig {
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  type?: "fractalNoise" | "turbulence";
  stitchTiles?: "noStitch" | "stitch";
}

interface ShorthandTurbulenceConfig extends BaseConfig {
  freq?: number;
  octaves?: number;
  seed?: number;
  type?: "fractalNoise" | "turbulence";
  stitch?: "noStitch" | "stitch";
}

export type ConvenienceTurbulenceConfig = Omit<
  ShorthandTurbulenceConfig,
  "type"
>;

const keyMap = {
  freq: "baseFrequency",
  octaves: "numOctaves",
  stitch: "stitchTiles",
  seed: "seed",
  type: "type",
};

export class TurbulenceNode extends AbstractNode<
  "turbulence",
  [],
  TurbulenceConfig
> {
  type = "turbulence" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feTurbulence result="${this.id}" ${attrs} />`;
  }
}

export function turbulence(config: ShorthandTurbulenceConfig = {}) {
  return new NodeAPI(
    new TurbulenceNode({
      input: [],
      config: mapKeys(config, keyMap),
    })
  );
}

export function fractalNoise(config: ConvenienceTurbulenceConfig = {}) {
  return turbulence({ ...config, type: "fractalNoise" });
}
