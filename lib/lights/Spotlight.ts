import { mapKeys } from "../utils";
import { AbstractPositionedLight, Position } from "./AbstractPositionedLight";

export interface SpotlightConfig extends Position {
  pointsAtX?: number;
  pointsAtY?: number;
  pointsAtZ?: number;
  specularExponent?: number;
  limitingConeAngle?: number;
}

export interface ShorthandSpotlightConfig
  extends Omit<SpotlightConfig, "specularExponent" | "limitingConeAngle"> {
  falloff?: number;
  angle?: number;
}

const keyMap = {
  falloff: "specularExponent",
  angle: "limitingConeAngle",
};

export class Spotlight
  extends AbstractPositionedLight<"spot">
  implements SpotlightConfig
{
  type = "spot" as const;
  pointsAtX?: number;
  pointsAtY?: number;
  pointsAtZ?: number;
  specularExponent?: number;
  limitingConeAngle?: number;

  constructor(config: SpotlightConfig) {
    super(config);
    this.pointsAtX = config.pointsAtX;
    this.pointsAtY = config.pointsAtY;
    this.pointsAtZ = config.pointsAtZ;
    this.specularExponent = config.specularExponent;
    this.limitingConeAngle = config.limitingConeAngle;
  }
}

export function spotlight(config: ShorthandSpotlightConfig = {}) {
  return new Spotlight(mapKeys(config, keyMap));
}
