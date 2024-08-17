import { Effect } from "./Effect";
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

export class FilterInternal {
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

export class Filter {
  [privateAPI]: FilterInternal;

  constructor(filter: FilterInternal) {
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
export function filter(root: Effect, attributes: SVGFilterAttributes = {}) {
  return new Filter(new FilterInternal(root[privateAPI], attributes));
}
