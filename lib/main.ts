import { FilterAPI } from "./Filter";
import { NodeAPI } from "./NodeAPI";
import { privateAPI } from "./privateAPI";
import { filter as createFilter } from "./Filter";

function toSVG(filter: FilterAPI): string {
  return `<svg xmlns="http://www.w3.org/2000/svg">${filter[
    privateAPI
  ].render()}</svg>`;
}

function toDataURL(filter: FilterAPI): string {
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

function css(filter: FilterAPI | NodeAPI, key?: string): string {
  if (filter instanceof NodeAPI) {
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

function compile(filter: FilterAPI | NodeAPI): string {
  if (filter instanceof FilterAPI) {
    return filter[privateAPI].render();
  } else {
    return filter[privateAPI].renderRoot();
  }
}

export { constantNodes as env } from "./nodes/ConstantNode";

export { blur } from "./nodes/BlurNode";
export {
  normal,
  multiply,
  screen,
  darken,
  lighten,
  overlay,
  colorDodge,
  colorBurn,
  hardLight,
  softLight,
  difference,
  exclusion,
  hue,
  saturation,
  color,
  luminosity,
} from "./nodes/BlendNode";
export { colorMatrix } from "./nodes/ColorMatrixNode";
export { componentTransfer } from "./nodes/ComponentTransferNode";
export {
  over,
  inside,
  out,
  xor,
  atop,
  arithmetic,
} from "./nodes/CompositeNode";
export { convolve } from "./nodes/ConvolveMatrixNode";
export { diffuse } from "./nodes/DiffuseLightingNode";
export { displace } from "./nodes/DisplacementMapNode";
export { flood } from "./nodes/FloodNode";
export { image } from "./nodes/ImageNode";
export { merge } from "./nodes/MergeNode";
export { dilate, erode } from "./nodes/MorphologyNode";
export { offset } from "./nodes/OffsetNode";
export { shadow } from "./nodes/DropShadowNode";
export { specular } from "./nodes/SpecularLightingNode";
export { tile } from "./nodes/TileNode";
export { turbulence, fractalNoise } from "./nodes/TurbulenceNode";

export { spotlight } from "./lights/Spotlight";
export { pointLight } from "./lights/PointLight";
export { distantLight } from "./lights/DistantLight";

export { filter } from "./Filter";

export { NodeAPI as Effect } from "./NodeAPI";
export { FilterAPI as Filter } from "./Filter";

export { css, unmount, compile };
