import { ConstantID } from "../types";
import { Node } from "./Node";
import { NodeAPI } from "../NodeAPI";

export class ConstantNode extends Node<"constant", [], {}> {
  type = "constant" as const;

  constructor(id: ConstantID) {
    super({ input: [], config: {} });
    this.id = id;
  }
}

function constant(id: ConstantID) {
  return new NodeAPI(new ConstantNode(id));
}

export const constantNodes = {
  source: constant("SourceGraphic"),
  sourceAlpha: constant("SourceAlpha"),
  background: constant("BackgroundImage"),
  backgroundAlpha: constant("BackgroundAlpha"),
  fill: constant("FillPaint"),
  stroke: constant("StrokePaint"),
};
