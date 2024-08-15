import { fractalNoise, merge, flood, env } from "hypercomp";
import { HelloExample } from "./HelloExample";
import { bevel } from "./utils";

export function WaterColorExample() {
  const texture = fractalNoise(0.05, {
    octaves: 3,
    seed: 0,
  });

  const fillTexture = texture.colorMatrix([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2.1, 1.1,
  ]);

  const outlineTexture = texture.colorMatrix([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1.7, 1.8,
  ]);

  const outline = env.source.dilate(3);

  // prettier-ignore
  const beveled = bevel(env.source, 8)

  const effect = merge([
    // Bevel fill
    flood("#666", { opacity: 0.4 }).in(
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
    flood("#ddd", { opacity: 0.75 }).in(
      outlineTexture.in(
        env.sourceAlpha.offset({ dx: -3, dy: 4 }).displace(texture, 17)
      )
    ),
    // Outline
    fillTexture.arithmetic(outline.out(env.source).displace(texture, 7), {
      k2: -1,
      k3: 1,
    }),
  ]);

  return <HelloExample effect={effect} className="bg-blue-400" />;
}
