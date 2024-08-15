import { merge, flood, env } from "hypercomp";
import { HelloExample } from "./HelloExample";

export function StickerExample({ edgeFactor = 3.2 }: { edgeFactor?: number }) {
  const effect = merge([
    flood("gray").in(
      env.sourceAlpha
        .erode(1 * edgeFactor)
        .dilate(3.5 * edgeFactor)
        .blur(1.5)
    ),
    flood("#fff")
      .in(env.sourceAlpha.erode(1 * edgeFactor))
      .dilate(3 * edgeFactor),
    flood("#ede739").in(env.sourceAlpha),
  ]);

  return <HelloExample effect={effect} className="bg-[#a07edf]" />;
}
