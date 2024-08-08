import { NodeType, ID, INode } from "../types";

export abstract class AbstractNode<
  Type extends NodeType = any,
  Input extends INode[] = any,
  Config extends {} = any
> implements INode<Type, Input, Config>
{
  abstract type: Type;
  id: ID = crypto.randomUUID();
  input: Input;
  config: Config;

  constructor({ input, config }: { input: Input; config: Config }) {
    this.input = input;
    this.config = config;
  }
}
