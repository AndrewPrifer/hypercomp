import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig, INode } from "../types";
import { renderAttrs, mapKeys, omitKeys } from "../utils";
import { Node } from "./Node";

interface TransferFunction {
  type: "identity" | "table" | "discrete" | "linear" | "gamma";
  slope?: number;
  intercept?: number;
  amplitude?: number;
  exponent?: number;
  offset?: number;
  tableValues?: number[];
}

// ComponentTransferNode
export interface ComponentTransferConfig extends BaseConfig {
  funcR?: TransferFunction;
  funcG?: TransferFunction;
  funcB?: TransferFunction;
  funcA?: TransferFunction;
}

export interface ShorthandComponentTransferConfig extends BaseConfig {
  r?: TransferFunction;
  g?: TransferFunction;
  b?: TransferFunction;
  a?: TransferFunction;
}

const componentTransferKeyMap = {
  r: "funcR",
  g: "funcG",
  b: "funcB",
  a: "funcA",
};

export class ComponentTransferNode extends Node<
  "component-transfer",
  [INode],
  ComponentTransferConfig
> {
  type = "component-transfer" as const;

  render() {
    const attrs = renderAttrs(
      omitKeys(this.config, ["funcR", "funcG", "funcB", "funcA"])
    );
    return `<feComponentTransfer in="${this.input[0].id}" result="${
      this.id
    }" ${attrs}>
    ${this.config.funcR ? `<feFuncR ${renderAttrs(this.config.funcR)} />` : ""}
    ${this.config.funcG ? `<feFuncG ${renderAttrs(this.config.funcG)} />` : ""}
    ${this.config.funcB ? `<feFuncB ${renderAttrs(this.config.funcB)} />` : ""}
    ${this.config.funcA ? `<feFuncA ${renderAttrs(this.config.funcA)} />` : ""}
    </feComponentTransfer>
    `;
  }
}

/**
 * Apply a component transfer to the input node.
 *
 * @param node The node to apply the component transfer to.
 * @param config
 * @returns The node with the component transfer applied.
 */
export function componentTransfer(
  node: NodeAPI,
  config: ShorthandComponentTransferConfig = {}
) {
  return new NodeAPI(
    new ComponentTransferNode({
      input: [node[privateAPI]],
      config: mapKeys(config, componentTransferKeyMap),
    })
  );
}
