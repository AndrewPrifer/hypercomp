import { Effect, Light } from "hypercomp";
import { HelloExample } from "../Segment";

export function BrainExample() {
  const pattern = Effect.turbulence(0.04, {
    octaves: 2,
    seed: 2,
    stitch: "stitch",
  });

  const texture = pattern
    .in(Effect.source.blur(5))
    .colorMatrix({ a: { a: 2 } });

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

  return (
    <HelloExample
      effect={effect}
      className="bg-black"
      by={{
        label: "Yoksel",
        url: "https://x.com/yoksel_en",
      }}
    />
  );
}
