import { AbstractPositionedLight, Position } from "./AbstractPositionedLight";

export interface PointLightConfig extends Position {}

export class PointLight extends AbstractPositionedLight<"point"> {
  type = "point" as const;
}

export function pointLight(config: PointLightConfig = {}) {
  return new PointLight(config);
}
