import { FilterAPI } from "./Filter";
import { privateAPI } from "./privateAPI";

export function toSVG(filter: FilterAPI): string {
  return `<svg xmlns="http://www.w3.org/2000/svg">${filter[
    privateAPI
  ].render()}</svg>`;
}

export function toDataURL(filter: FilterAPI): string {
  const id = filter[privateAPI].attributes.id ?? "filter";
  const svg = toSVG(filter);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}#${id}`;
}

export function css(filter: FilterAPI): string {
  return `url(${toDataURL(filter)})`;
}

export function toEffects(filter: FilterAPI): string {
  return filter[privateAPI].renderEffects();
}

export function toFilter(filter: FilterAPI): string {
  return filter[privateAPI].render();
}

export { constantNodes as env } from "./nodes/ConstantNode";

export { blur } from "./nodes/BlurNode";
export {
  blend,
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
  composite,
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
export { morph } from "./nodes/MorphologyNode";
export { offset } from "./nodes/OffsetNode";
export { shadow } from "./nodes/DropShadowNode";
export { specular } from "./nodes/SpecularLightingNode";
export { tile } from "./nodes/TileNode";
export { turbulence, fractalNoise } from "./nodes/TurbulenceNode";

export { spotlight } from "./lights/Spotlight";
export { pointLight } from "./lights/PointLight";
export { distantLight } from "./lights/DistantLight";

export { filter } from "./Filter";
