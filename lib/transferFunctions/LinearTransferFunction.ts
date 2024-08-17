import { AbstractTransferFunction } from "./AbstractTransferFunction";

export interface LinearTransferFunctionConfig {
  slope: number;
  intercept: number;
}

export class LinearTransferFunction
  extends AbstractTransferFunction<"linear">
  implements LinearTransferFunctionConfig
{
  type = "linear" as const;
  slope: number;
  intercept: number;

  constructor(config: LinearTransferFunctionConfig) {
    super();
    this.slope = config.slope;
    this.intercept = config.intercept;
  }
}

export function linearTransferFunction(slope: number, intercept: number) {
  return new LinearTransferFunction({
    slope,
    intercept,
  });
}
