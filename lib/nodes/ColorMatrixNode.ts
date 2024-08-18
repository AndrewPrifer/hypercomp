import { Effect } from "../Effect";
import { privateAPI } from "../privateAPI";
import { BaseConfig, ColorMatrix } from "../types";
import { renderAttrs, rgbaMatrixToArray } from "../utils";
import { AbstractNode } from "./AbstractNode";

export interface ColorMatrixConfig extends BaseConfig {
  type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
  values?: number | number[];
}

export interface ShorthandColorMatrixConfig extends BaseConfig {}

export class ColorMatrixNode extends AbstractNode<
  "color-matrix",
  [AbstractNode],
  ColorMatrixConfig
> {
  type = "color-matrix" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feColorMatrix in="${this.input[0].id}" result="${this.id}" ${attrs} />`;
  }
}

function internalColorMatrix(node: Effect, config: ColorMatrixConfig) {
  return new Effect(
    new ColorMatrixNode({
      input: [node[privateAPI]],
      config,
    })
  );
}

/**
 * Apply a color matrix to the input node.
 *
 * @param node The node to apply the color matrix to.
 * @param values The values of the color matrix.
 * @param config
 * @returns The node with the color matrix applied.
 */
export function colorMatrix(
  node: Effect,
  matrix: number[] | ColorMatrix,
  config: ShorthandColorMatrixConfig = {}
) {
  matrix = Array.isArray(matrix) ? matrix : rgbaMatrixToArray(matrix);
  return internalColorMatrix(node, {
    type: "matrix",
    values: matrix,
    ...config,
  });
}

/**
 * Apply saturation to the input node.
 *
 * @param node The node to apply the saturation to.
 * @param value The amount of saturation to apply.
 * @param config
 * @returns The node with the saturation applied.
 */
export function saturate(
  node: Effect,
  value: number,
  config: ShorthandColorMatrixConfig = {}
) {
  return internalColorMatrix(node, {
    type: "saturate",
    values: value,
    ...config,
  });
}

/**
 * Rotate the hue of the input node.
 *
 * @param node The node to rotate the hue of.
 * @param angle The angle to rotate the hue by.
 * @param config
 * @returns The node with the hue rotated.
 */
export function hueRotate(
  node: Effect,
  angle: number,
  config: ShorthandColorMatrixConfig = {}
) {
  return internalColorMatrix(node, {
    type: "hueRotate",
    values: angle,
    ...config,
  });
}

/**
 * Convert the luminance of the input node to alpha.
 *
 * @param node The node to convert the luminance of.
 * @param config
 * @returns The node with the luminance converted to alpha.
 */
export function luminanceToAlpha(
  node: Effect,
  config: ShorthandColorMatrixConfig = {}
) {
  return internalColorMatrix(node, { type: "luminanceToAlpha", ...config });
}
