import { AbstractTransferFunction } from "./AbstractTransferFunction";

export interface TableTransferFunctionConfig {
  tableValues: number[];
}

export class TableTransferFunction
  extends AbstractTransferFunction<"table">
  implements TableTransferFunctionConfig
{
  type = "table" as const;
  tableValues: number[];

  constructor(config: TableTransferFunctionConfig) {
    super();
    this.tableValues = config.tableValues;
  }
}

export function tableTransferFunction(tableValues: number[]) {
  return new TableTransferFunction({
    tableValues,
  });
}
