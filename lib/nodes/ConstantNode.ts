import { ConstantName } from "../types";
import { AbstractNode } from "./AbstractNode";
import { NodeAPI } from "../NodeAPI";

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

function constant(id: ConstantName) {
  return new NodeAPI(new ConstantNode(id));
}

export const constantNodes = {
  /**
   * The source graphic.
   */
  source: constant("SourceGraphic"),
  /**
   * The source alpha.
   */
  sourceAlpha: constant("SourceAlpha"),
  /**
   * The background graphic.
   */
  background: constant("BackgroundImage"),
  /**
   * The background alpha.
   */
  backgroundAlpha: constant("BackgroundAlpha"),
  /**
   * The fill paint.
   */
  fill: constant("FillPaint"),
  /**
   * The stroke paint.
   */
  stroke: constant("StrokePaint"),
};
