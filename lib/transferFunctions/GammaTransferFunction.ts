import { AbstractTransferFunction } from "./AbstractTransferFunction";

export interface GammaTransferFunctionConfig {
  amplitude: number;
  exponent: number;
  offset: number;
}

export class GammaTransferFunction
  extends AbstractTransferFunction<"gamma">
  implements GammaTransferFunctionConfig
{
  type = "gamma" as const;
  amplitude: number;
  exponent: number;
  offset: number;

  constructor(config: GammaTransferFunctionConfig) {
    super();
    this.amplitude = config.amplitude;
    this.exponent = config.exponent;
    this.offset = config.offset;
  }
}

export function gammaTransferFunction(
  amplitude: number,
  exponent: number,
  offset: number
) {
  return new GammaTransferFunction({
    amplitude,
    exponent,
    offset,
  });
}
