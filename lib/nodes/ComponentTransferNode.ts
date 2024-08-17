import { Effect } from "../Effect";
import { privateAPI } from "../privateAPI";
import { DiscreteTransferFunction } from "../transferFunctions/DiscreteTransferFunction";
import { GammaTransferFunction } from "../transferFunctions/GammaTransferFunction";
import { LinearTransferFunction } from "../transferFunctions/LinearTransferFunction";
import { TableTransferFunction } from "../transferFunctions/TableTransferFunction";
import { BaseConfig } from "../types";
import { renderAttrs, mapKeys, omitKeys } from "../utils";
import { AbstractNode } from "./AbstractNode";

type TransferFunction =
  | TableTransferFunction
  | DiscreteTransferFunction
  | LinearTransferFunction
  | GammaTransferFunction;

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

export class ComponentTransferNode extends AbstractNode<
  "component-transfer",
  [AbstractNode],
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
  node: Effect,
  config: ShorthandComponentTransferConfig = {}
) {
  return new Effect(
    new ComponentTransferNode({
      input: [node[privateAPI]],
      config: mapKeys(config, componentTransferKeyMap),
    })
  );
}
