export type LightType = "distant" | "point" | "spot";

export abstract class AbstractLight<Type extends LightType> {
  abstract type: Type;
}
