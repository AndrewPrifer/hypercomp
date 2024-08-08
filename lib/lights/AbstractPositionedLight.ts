import { AbstractLight, LightType } from "./AbstractLight";

export type Position = { x?: number; y?: number; z?: number };

export abstract class AbstractPositionedLight<
  Type extends LightType
> extends AbstractLight<Type> {
  x?: number;
  y?: number;
  z?: number;

  constructor(position: Position) {
    super();
    this.x = position.x;
    this.y = position.y;
    this.z = position.z;
  }
}
