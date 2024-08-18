import { Effect } from "hypercomp";
import { HelloExample } from "./HelloExample";

export function GooExample() {
  const effect = Effect.source.atop(
    Effect.source.blur(10).colorMatrix({ a: { a: 19, o: -9 } })
  );

  return (
    <HelloExample
      effect={effect}
      className="text-green-600 tracking-[-0.4em]"
    />
  );
}
