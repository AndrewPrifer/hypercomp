import { ChristmasExample } from "./ChristmasExample";
import { BrainExample } from "./BrainExample";
import { WaterColorExample } from "./WaterColorExample";
import { BevelExample } from "./BevelExample";
import { StickerExample } from "./StickerExample";
import { FunkyExample } from "./FunkyExample";

export default function App() {
  return (
    <div
      className="grid grid-cols-2 max-[1400px]:grid-cols-1 w-dvw min-h-dvh"
      style={{
        fontFamily: "Sansita, sans-serif",
      }}
    >
      <FunkyExample />
      <BevelExample />
      <WaterColorExample />
      <BrainExample />
      <ChristmasExample />
      <StickerExample />
    </div>
  );
}
