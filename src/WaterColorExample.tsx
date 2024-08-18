import { Effect } from "hypercomp";
import { HelloExample } from "./HelloExample";
import { bevel } from "./utils";

export function WaterColorExample() {
  const texture = Effect.fractalNoise(0.05, {
    octaves: 3,
    seed: 0,
  });

  const fillTexture = texture.colorMatrix({
    r: { r: 0 },
    g: { g: 0 },
    b: { b: 0 },
    a: { a: -2.1, o: 1.1 },
  });

  const outlineTexture = texture.colorMatrix({
    r: { r: 0 },
    g: { g: 0 },
    b: { b: 0 },
    a: { a: -1.7, o: 1.8 },
  });

  const outline = Effect.source.dilate(3);

  // prettier-ignore
  const beveled = bevel(Effect.source, 8)

  const effect = Effect.merge([
    // Bevel fill
    Effect.flood("#666", { opacity: 0.4 }).in(
      beveled.offset({ dx: -9, dy: -9 }).out(outline).displace(texture, 17)
    ),
    // Bevel outline
    fillTexture
      .arithmetic(beveled.dilate(2).out(beveled).displace(texture, 7), {
        k2: -1,
        k3: 1,
      })
      .offset({ dx: -7, dy: -7 })
      .out(outline),
    // Fill
    Effect.flood("#ddd", { opacity: 0.75 }).in(
      outlineTexture.in(
        Effect.sourceAlpha.offset({ dx: -3, dy: 4 }).displace(texture, 17)
      )
    ),
    // Outline
    fillTexture.arithmetic(outline.out(Effect.source).displace(texture, 7), {
      k2: -1,
      k3: 1,
    }),
  ]);

  return <HelloExample effect={effect} className="bg-blue-400" />;
}
