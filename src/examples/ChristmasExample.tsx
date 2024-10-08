import { Effect, Light, Transfer } from "hypercomp";
import { HelloExample } from "../Segment";

export function ChristmasExample() {
  const effect = Effect.merge([
    Effect.sourceAlpha
      .blur(3)
      .componentTransfer({
        a: Transfer.linear(0.7, -0.1),
      })
      .offset({ dy: 2 }),

    Effect.sourceAlpha
      .blur(5)
      .specular(Light.pointLight({ x: 40, y: -30, z: 200 }), {
        scale: 30,
        shininess: 30,
      })
      .arithmetic(
        Effect.image("/christmasBg.svg", {
          width: 4000,
          height: 2000,
        }),
        {
          k2: 1,
          k3: 1,
        }
      )
      .in(Effect.sourceAlpha),

    Effect.sourceAlpha
      .blur(4)
      .specular(Light.pointLight({ x: 0, y: -25000, z: 1 }), {
        scale: 4,
        strength: 2,
        shininess: 5,
        color: "#fff",
      })
      .blur(3)
      .componentTransfer({
        a: Transfer.linear(2.5, -1),
      })
      .componentTransfer({
        a: Transfer.linear(2, -1),
      }),
  ]);

  return <HelloExample effect={effect} className="bg-[#64ae5a]" />;
}
