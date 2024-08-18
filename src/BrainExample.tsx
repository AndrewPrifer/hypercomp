import { Effect, Light } from "hypercomp";
import { HelloExample } from "./HelloExample";

export function BrainExample() {
  const pattern = Effect.turbulence(0.04, {
    octaves: 2,
    seed: 2,
    stitch: "stitch",
  });

  const texture = pattern
    .in(Effect.source.blur(5))
    .colorMatrix([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0]);

  const effect = Effect.merge([
    Effect.flood("hsl(350,100%,73%)").in(texture),

    pattern
      .specular(Light.distantLight({ azimuth: 68, elevation: 240 }), {
        scale: 40,
        strength: 1,
        shininess: 35,
      })
      .in(texture),
  ]);

  return <HelloExample effect={effect} className="bg-black" />;
}
