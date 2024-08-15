import { Effect } from "hypercomp";
import { range } from "remeda";

export function bevel(effect: Effect, size: number) {
  return effect.convolve(
    range(0, size)
      .map((_, i) => range(0, size).map((_, j) => (i === j ? 1 : 0)))
      .flat(),
    {
      order: size,
      divisor: 1,
    }
  );
}
