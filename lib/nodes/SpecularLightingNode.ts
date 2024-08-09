import { DistantLight } from "../lights/DistantLight";
import { PointLight } from "../lights/PointLight";
import { Spotlight } from "../lights/Spotlight";
import { NodeAPI } from "../NodeAPI";
import { privateAPI } from "../privateAPI";
import { BaseConfig } from "../types";
import { renderAttrs, mapKeys, omitKeys } from "../utils";
import { AbstractNode } from "./AbstractNode";

export interface SpecularLightingConfig extends BaseConfig {
  specularConstant?: number;
  specularExponent?: number;
  surfaceScale?: number;
  "lighting-color"?: string;
  light: PointLight | DistantLight | Spotlight;
}

export interface ShorthandSpecularLightingConfig extends BaseConfig {
  strength?: number;
  shininess?: number;
  scale?: number;
  color?: string;
}

const keyMap = {
  color: "lighting-color",
  scale: "surfaceScale",
  strength: "specularConstant",
  shininess: "specularExponent",
};

export class SpecularLightingNode extends AbstractNode<
  "specular-lighting",
  [AbstractNode],
  SpecularLightingConfig
> {
  type = "specular-lighting" as const;

  render() {
    const attrs = renderAttrs(omitKeys(this.config, ["light"]));
    const lightAttrs = renderAttrs(omitKeys(this.config.light, ["type"]));
    const lightTag =
      this.config.light.type === "point"
        ? "fePointLight"
        : this.config.light.type === "distant"
        ? "feDistantLight"
        : "feSpotLight";
    return `<feSpecularLighting in="${this.input[0].id}" result="${this.id}" ${attrs}>
        <${lightTag} ${lightAttrs} />
    </feSpecularLighting>`;
  }
}

/**
 * Apply a specular lighting effect to the input node.
 *
 * @param node The node to apply the specular lighting effect to.
 * @param light The light source to use for the specular lighting effect.
 * @param config
 * @returns The node with the specular lighting effect applied.
 */
export function specular(
  node: NodeAPI,
  light: PointLight | DistantLight | Spotlight,
  config: ShorthandSpecularLightingConfig = {}
) {
  return new NodeAPI(
    new SpecularLightingNode({
      input: [node[privateAPI]],
      config: mapKeys({ ...config, light }, keyMap),
    })
  );
}
