import { NodeType, ID, RenderableNode } from "../types";
import { buildRenderQueue } from "../utils";

export abstract class AbstractNode<
  Type extends NodeType = any,
  Input extends AbstractNode[] = any,
  Config extends {} = any
> {
  abstract type: Type;
  abstract render?(): string;
  #internalID: ID = crypto.randomUUID();
  input: Input;
  config: Config;

  constructor({ input, config }: { input: Input; config: Config }) {
    this.input = input;
    this.config = config;
  }

  renderRoot(): string {
    const effects = buildRenderQueue(this)
      .filter((node): node is RenderableNode => !!node.render)
      .map((node) => node.render())
      .join("\n");

    return effects;
  }

  get id() {
    return `${this.type}-${this.#internalID}`;
  }
}
