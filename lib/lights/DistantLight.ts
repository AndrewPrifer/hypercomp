import { AbstractLight } from "./AbstractLight";

export interface DistantLightConfig {
  azimuth?: number;
  elevation?: number;
}

export class DistantLight
  extends AbstractLight<"distant">
  implements DistantLightConfig
{
  type = "distant" as const;
  azimuth?: number;
  elevation?: number;

  constructor(config: DistantLightConfig) {
    super();
    this.azimuth = config.azimuth;
    this.elevation = config.elevation;
  }
}

export function distantLight(config: DistantLightConfig = {}) {
  return new DistantLight(config);
}
