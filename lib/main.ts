import { Filter } from "./Filter";
import { Effect } from "./Effect";
import { privateAPI } from "./privateAPI";
import { filter as createFilter } from "./Filter";

function toSVG(filter: Filter): string {
  return `<svg xmlns="http://www.w3.org/2000/svg">${filter[
    privateAPI
  ].render()}</svg>`;
}

function toDataURL(filter: Filter): string {
  const oldId = filter[privateAPI].attributes.id;
  const id = "filter";
  filter[privateAPI].attributes.id = id;
  const svg = toSVG(filter);
  filter[privateAPI].attributes.id = oldId;
  return `data:image/svg+xml;utf8,${encodeURI(svg)
    .replaceAll("(", "%28")
    .replaceAll(")", "%29")
    .replaceAll("#", "%23")}#${id}`;
}

let svgElement: SVGSVGElement | null = null;

const filterCache = new Map<string, SVGFilterElement>();

function createFilterElementID(key: string): string {
  const randomStuff = "9710187123";
  return `hypercomp-${randomStuff}-${key}`;
}

function css(filter: Filter | Effect, key?: string): string {
  if (filter instanceof Effect) {
    filter = createFilter(filter);
  }

  if (key) {
    if (!svgElement) {
      svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.style.visibility = "hidden";
      svgElement.style.position = "absolute";
      svgElement.style.width = "0";
      svgElement.style.height = "0";
      svgElement.style.pointerEvents = "none";
      document.body.appendChild(svgElement);
    }

    let filterElement = filterCache.get(key);
    if (!filterElement) {
      filterElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "filter"
      );

      filterElement.id = createFilterElementID(key);
      svgElement.appendChild(filterElement);
      filterCache.set(key, filterElement);
    }

    Object.entries(filter[privateAPI].attributes).forEach(([key, value]) => {
      if (value) {
        filterElement.setAttribute(key, value.toString());
      } else {
        filterElement.removeAttribute(key);
      }
    });
    filterElement.innerHTML = filter[privateAPI].root.renderRoot();

    return `url(#${filterElement.id})`;
  }

  return `url(${toDataURL(filter)})`;
}

function unmount(key: string) {
  const filterElement = filterCache.get(key);
  if (filterElement) {
    filterElement.remove();
    filterCache.delete(key);
  }

  if (filterCache.size === 0 && svgElement) {
    svgElement.remove();
    svgElement = null;
  }
}

function compile(filter: Filter | Effect): string {
  if (filter instanceof Filter) {
    return filter[privateAPI].render();
  } else {
    return filter[privateAPI].renderRoot();
  }
}

import { spotlight } from "./lights/Spotlight";
import { pointLight } from "./lights/PointLight";
import { distantLight } from "./lights/DistantLight";

export const Light = {
  spotlight,
  pointLight,
  distantLight,
};

import { tableTransferFunction } from "./transferFunctions/TableTransferFunction";
import { gammaTransferFunction } from "./transferFunctions/GammaTransferFunction";
import { linearTransferFunction } from "./transferFunctions/LinearTransferFunction";
import { discreteTransferFunction } from "./transferFunctions/DiscreteTransferFunction";

export const Transfer = {
  table: tableTransferFunction,
  gamma: gammaTransferFunction,
  linear: linearTransferFunction,
  discrete: discreteTransferFunction,
};

export { Effect } from "./Effect";
export { Filter } from "./Filter";

export { css, unmount, compile };
