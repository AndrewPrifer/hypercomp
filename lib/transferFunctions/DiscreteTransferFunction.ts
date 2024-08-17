import { AbstractTransferFunction } from "./AbstractTransferFunction";

export interface DiscreteTransferFunctionConfig {
  tableValues: number[];
}

export class DiscreteTransferFunction
  extends AbstractTransferFunction<"discrete">
  implements DiscreteTransferFunctionConfig
{
  type = "discrete" as const;
  tableValues: number[];

  constructor(config: DiscreteTransferFunctionConfig) {
    super();
    this.tableValues = config.tableValues;
  }
}

export function discreteTransferFunction(tableValues: number[]) {
  return new DiscreteTransferFunction({ tableValues });
}
