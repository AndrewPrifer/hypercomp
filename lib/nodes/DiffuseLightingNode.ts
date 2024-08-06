import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import {
  BaseConfig,
  DistantLight,
  INode,
  PointLight,
  SpotLight,
} from "../types";
import { renderAttrs, mapKeys, omitKeys } from "../utils";
import { Node } from "./Node";

export interface DiffuseLightingConfig extends BaseConfig {
  diffuseConstant?: number;
  surfaceScale?: number;
  "lighting-color"?: string;
  light: PointLight | DistantLight | SpotLight;
}

export interface ShorthandDiffuseLightingConfig extends BaseConfig {
  strength?: number;
  scale?: number;
  color?: string;
  light: PointLight | DistantLight | SpotLight;
}

const keyMap = {
  color: "lighting-color",
  scale: "surfaceScale",
  strength: "diffuseConstant",
};

export class DiffuseLightingNode extends Node<
  "diffuse-lighting",
  [INode],
  DiffuseLightingConfig
> {
  type = "diffuse-lighting" as const;

  render() {
    const attrs = renderAttrs(omitKeys(this.config, ["light"]));
    const lightAttrs = renderAttrs(omitKeys(this.config.light, ["type"]));
    const lightTag =
      this.config.light.type === "point"
        ? "fePointLight"
        : this.config.light.type === "distant"
        ? "feDistantLight"
        : "feSpotLight";
    return `<feDiffuseLighting in="${this.input[0].id}" result="${this.id}" ${attrs}>
        <${lightTag} ${lightAttrs} />
    </feDiffuseLighting>`;
  }
}

/**
 * Apply a diffuse lighting effect to the input node.
 *
 * @param node The node to apply the diffuse lighting effect to.
 * @param config
 * @returns The node with the diffuse lighting effect applied.
 */
export function diffuseLight(
  node: NodeAPI,
  config: ShorthandDiffuseLightingConfig = { light: { type: "point" } }
) {
  return new NodeAPI(
    new DiffuseLightingNode({
      input: [node[privateAPI]],
      config: mapKeys(config, keyMap),
    })
  );
}
