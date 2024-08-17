import { ConstantName } from "../types";
import { AbstractNode } from "./AbstractNode";
import { Effect } from "../Effect";

export class ConstantNode extends AbstractNode<"constant", [], {}> {
  type = "constant" as const;
  #name: ConstantName;

  constructor(name: ConstantName) {
    super({ input: [], config: {} });
    this.#name = name;
  }

  get id() {
    return this.#name;
  }

  render = undefined;
}

export function constant(id: ConstantName) {
  return new Effect(new ConstantNode(id));
}
