export type TransferFunctionType = "table" | "discrete" | "linear" | "gamma";

export abstract class AbstractTransferFunction<
  Type extends TransferFunctionType
> {
  abstract type: Type;
}
