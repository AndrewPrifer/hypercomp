import { flood, env, merge } from "hypercomp";
import { range } from "remeda";
import { HelloExample } from "./HelloExample";

export function FunkyExample() {
  const effect = merge([
    ...range(0, 10)
      .map((_, i) =>
        flood("rgb(231, 34, 34)")
          .in(env.source)
          .offset({ dx: i * 5, dy: i * 5 })
          .hueRotate(i * 30)
      )
      .toReversed(),
    env.source,
  ]).offset({ dx: -15, dy: -15 });

  return <HelloExample effect={effect} className="bg-[#ff75c8] text-white" />;
}
