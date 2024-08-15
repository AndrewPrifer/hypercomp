import { merge, image, pointLight, env } from "hypercomp";
import { HelloExample } from "./HelloExample";

export function ChristmasExample() {
  const effect = merge([
    env.sourceAlpha
      .blur(3)
      .componentTransfer({
        a: { type: "linear", slope: 0.7, intercept: -0.1 },
      })
      .offset({ dy: 2 }),
    image("/christmasBg.svg", {
      width: 4000,
      height: 2000,
    })
      .over(env.sourceAlpha)
      .in(env.sourceAlpha),
    env.sourceAlpha
      .blur(4)
      .specular(pointLight({ x: 0, y: -25000, z: 1 }), {
        scale: 4,
        strength: 2,
        shininess: 5,
        color: "#fff",
      })
      .blur(3)
      .componentTransfer({
        a: { type: "linear", slope: 2.5, intercept: -1 },
      })
      .componentTransfer({
        a: { type: "linear", slope: 2, intercept: -1 },
      }),
  ]);

  return (
    <>
      <HelloExample effect={effect} className="bg-[#64ae5a]" />
    </>
  );
}
