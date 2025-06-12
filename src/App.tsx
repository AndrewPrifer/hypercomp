import { ChristmasExample } from "./examples/ChristmasExample";
import { BrainExample } from "./examples/BrainExample";
import { WaterColorExample } from "./examples/WaterColorExample";
import { BevelExample } from "./examples/BevelExample";
import { StickerExample } from "./examples/StickerExample";
import { FunkyExample } from "./examples/FunkyExample";
import { LiquidGlassExample } from "./examples/LiquidGlassExample";

// Detect Safari browser
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function App() {
  return (
    <div>
      <div className="fixed size-fit mx-auto inset-x-0 bottom-4 bg-black text-white px-4 py-1 rounded-md z-10">
        Made with ❤️ by{" "}
        <a
          className="underline cursor-pointer"
          href="https://x.com/AndrewPrifer"
          target="_blank"
        >
          Andrew Prifer
        </a>{" "}
        &ndash;{" "}
        <a
          className="underline"
          href="https://github.com/AndrewPrifer/hypercomp"
        >
          Learn more
        </a>
      </div>
      <div className="grid grid-cols-2 max-[1400px]:grid-cols-1 w-dvw min-h-dvh">
        {!isSafari && <LiquidGlassExample />}
        <FunkyExample />
        <BevelExample />
        <WaterColorExample />
        <BrainExample />
        <ChristmasExample />
        {isSafari && <StickerExample />}
      </div>
    </div>
  );
}
