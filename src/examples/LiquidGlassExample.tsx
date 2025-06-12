import { Effect } from "hypercomp";
import { BackdropExample } from "../Segment";
import { useRef, useState } from "react";
import { useFilter } from "hypercomp/react";

export function LiquidGlassExample() {
  const displacementMap = Effect.image("/displacementMap.png", {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  const frostedFilter = Effect.source.blur(0.005).displace(displacementMap, 1, {
    xChannel: "R",
    yChannel: "G",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  return (
    <BackdropExample
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "url(/flowerBg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "0 -160px",
        backgroundRepeat: "no-repeat",
      }}
      className="size-full flex items-center justify-center"
    >
      <div
        className="absolute text-[80px] font-bold text-white/30 size-[240px] bg-white/10 rounded-full border-2 border-white/20"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))`,
          backdropFilter: useFilter(
            frostedFilter.filter({
              primitiveUnits: "objectBoundingBox",
            })
          ),
          transition: "transform 0.1s ease-out",
        }}
      />
    </BackdropExample>
  );
}
