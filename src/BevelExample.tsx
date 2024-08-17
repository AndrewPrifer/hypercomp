import { Effect } from "hypercomp";
import { bevel } from "./utils";
import { HelloExample } from "./HelloExample";

export function BevelExample() {
  const effect = Effect.merge([
    Effect.flood("#900").in(bevel(Effect.source, 9)).offset({ dx: 5, dy: 5 }),
    Effect.flood("#f00").in(Effect.source),
  ]);

  return <HelloExample effect={effect} className="bg-[#1cdfbb]" />;
}
