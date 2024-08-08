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

function internalTurbulence(
  frequency: number,
  config: ShorthandTurbulenceConfig = {}
) {
  return new NodeAPI(
    new TurbulenceNode({
      input: [],
      config: mapKeys({ ...config, baseFrequency: frequency }, keyMap),
    })
  );
}

/**
 * Apply a turbulence effect to the input node.
 *
 * @param frequency The base frequency of the turbulence.
 * @param config
 * @returns The turbulence node.
 */
export function turbulence(
  frequency: number,
  config: ConvenienceTurbulenceConfig = {}
) {
  return internalTurbulence(frequency, { ...config, type: "turbulence" });
}

/**
 * Apply a fractal noise effect to the input node.
 *
 * @param frequency The base frequency of the noise.
 * @param config
 * @returns The noise node.
 */
export function fractalNoise(
  frequency: number,
  config: ConvenienceTurbulenceConfig = {}
) {
  return internalTurbulence(frequency, { ...config, type: "fractalNoise" });
}
