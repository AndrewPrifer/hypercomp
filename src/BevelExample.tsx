import { flood, merge, env } from "hypercomp";
import { bevel } from "./utils";
import { HelloExample } from "./HelloExample";

export function BevelExample() {
  const effect = merge([
    merge([
      flood("#900").in(bevel(env.source, 9)).offset({ dx: 5, dy: 5 }),
      flood("#f00").in(env.source),
    ]),
  ]);

  return <HelloExample effect={effect} className="bg-[#1cdfbb]" />;
}
