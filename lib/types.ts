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

export type ConstantID =
  | "SourceGraphic"
  | "SourceAlpha"
  | "BackgroundImage"
  | "BackgroundAlpha"
  | "FillPaint"
  | "StrokePaint";

export interface INode<
  Type extends NodeType = any,
  Input extends INode[] = any,
  Config extends {} = any
> {
  type: Type;
  id: ID;
  input: Input;
  config: Config;
  render?(): string;
}

export type RenderableNode = INode & { render: () => string };

export interface BaseConfig {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface PointLight {
  type: "point";
  x?: number;
  y?: number;
  z?: number;
}

export interface DistantLight {
  type: "distant";
  azimuth?: number;
  elevation?: number;
}

export interface SpotLight {
  type: "spot";
  x?: number;
  y?: number;
  z?: number;
  pointsAtX?: number;
  pointsAtY?: number;
  pointsAtZ?: number;
  specularExponent?: number;
  limitingConeAngle?: number;
}
