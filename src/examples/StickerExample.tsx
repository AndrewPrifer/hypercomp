import { Effect } from "hypercomp";
import { HelloExample } from "../Segment";

export function StickerExample({ edgeFactor = 3.2 }: { edgeFactor?: number }) {
  const effect = Effect.merge([
    Effect.flood("gray").in(
      Effect.sourceAlpha
        .erode(1 * edgeFactor)
        .dilate(3.5 * edgeFactor)
        .blur(1.5)
    ),

    Effect.flood("#fff")
      .in(Effect.sourceAlpha.erode(1 * edgeFactor))
      .dilate(3 * edgeFactor),

    Effect.flood("#ede739").in(Effect.sourceAlpha),
  ]);

  return <HelloExample effect={effect} className="bg-[#a07edf]" />;
}
