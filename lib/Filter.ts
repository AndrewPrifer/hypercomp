import { NodeAPI } from "./NodeAPI";
import { privateAPI } from "./privateAPI";
import { INode, RenderableNode } from "./types";
import { renderAttrs, buildRenderQueue } from "./utils";

export interface SVGFilterAttributes {
  id?: string;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  filterUnits?: "userSpaceOnUse" | "objectBoundingBox";
  primitiveUnits?: "userSpaceOnUse" | "objectBoundingBox";
  colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
  [key: string]: string | undefined; // Allow additional attributes
}

export class Filter {
  root: INode;
  attributes: SVGFilterAttributes;

  constructor(root: INode, attributes: SVGFilterAttributes = {}) {
    this.root = root;
    this.attributes = attributes;
  }

  renderEffects() {
    const effects = buildRenderQueue(this.root)
      .filter((node): node is RenderableNode => !!node.render)
      .map((node) => node.render())
      .join("\n");

    return effects;
  }

  render() {
    const effects = this.renderEffects();
    const attrs = renderAttrs(this.attributes);

    return `<filter id="filter" ${attrs}>${effects}</filter>`;
  }
}

export class FilterAPI {
  [privateAPI]: Filter;

  constructor(filter: Filter) {
    this[privateAPI] = filter;
  }
}

/**
 * Create a new filter out of the given root node.
 *
 * @param root The root node of the filter.
 * @param attributes Additional attributes for the filter element.
 * @returns The filter API.
 */
export function filter(root: NodeAPI, attributes: SVGFilterAttributes = {}) {
  return new FilterAPI(new Filter(root[privateAPI], attributes));
}
