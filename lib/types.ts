import { AbstractNode } from "./nodes/AbstractNode";

// all the SVG filter effects
export type NodeType =
  | "constant"
  | "blend"
  | "blur"
  | "drop-shadow"
  | "color-matrix"
  | "component-transfer"
  | "composite"
  | "convolve-matrix"
  | "diffuse-lighting"
  | "displacement-map"
  | "flood"
  | "image"
  | "merge"
  | "merge-node"
  | "morphology"
  | "offset"
  | "specular-lighting"
  | "tile"
  | "turbulence";

export type ID = string;

export type ConstantName =
  | "SourceGraphic"
  | "SourceAlpha"
  | "BackgroundImage"
  | "BackgroundAlpha"
  | "FillPaint"
  | "StrokePaint";

export type RenderableNode = AbstractNode & { render: () => string };

export interface BaseConfig {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
}
