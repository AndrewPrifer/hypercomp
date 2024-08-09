import { NodeAPI } from "./NodeAPI";
import { AbstractNode } from "./nodes/AbstractNode";
import { privateAPI } from "./privateAPI";
import { renderAttrs } from "./utils";

export interface SVGFilterAttributes {
  id?: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  filterUnits?: "userSpaceOnUse" | "objectBoundingBox";
  primitiveUnits?: "userSpaceOnUse" | "objectBoundingBox";
  colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
  [key: string]: string | number | undefined; // Allow additional attributes
}

export class Filter {
  root: AbstractNode;
  attributes: SVGFilterAttributes;

  constructor(root: AbstractNode, attributes: SVGFilterAttributes = {}) {
    this.root = root;
    this.attributes = attributes;
  }

  render() {
    const effects = this.root.renderRoot();
    const attrs = renderAttrs(this.attributes);

    return `<filter ${attrs}>${effects}</filter>`;
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
