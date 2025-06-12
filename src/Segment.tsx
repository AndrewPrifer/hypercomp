import { useFilter } from "hypercomp/react";
import { Effect, Filter } from "hypercomp";
import { forwardRef } from "react";

export function HelloExample({
  effect,
  by,
  className = "",
}: {
  effect: Effect | Filter;
  by?: {
    label: string;
    url: string;
  };
  className?: string;
}) {
  return (
    <div
      className={`relative size-full overflow-hidden min-h-[400px] max-sm:min-h-[200px] ${className}`}
    >
      <div
        className="size-full flex items-center justify-center max-sm:scale-50"
        style={{
          filter: useFilter(effect),
          fontFamily: "Sansita, sans-serif",
        }}
      >
        <div
          className="focus:outline-none italic leading-[0.7em] text-center translate-y-[-30px]"
          style={{
            fontSize: "200px",
            fontWeight: 900,
          }}
        >
          <p>Hyper</p>
          <p>comp</p>
        </div>
      </div>
      {by && (
        <div className="absolute size-fit bottom-2 right-2 bg-white/90 text-black/70 text-sm font-medium px-3 rounded">
          By{" "}
          <a className="underline" href={by.url} target="_blank">
            {by.label}
          </a>
        </div>
      )}
    </div>
  );
}

export const BackdropExample = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function Segment({ children, className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`relative size-full overflow-hidden min-h-[400px] max-sm:min-h-[200px] ${className}`}
      {...props}
    >
      <div
        className="focus:outline-none italic leading-[0.7em] text-center translate-y-[-30px]"
        style={{
          fontSize: "200px",
          fontWeight: 900,
          WebkitTextStroke: "5px white",
          color: "transparent",
        }}
      >
        <p>Hyper</p>
        <p>comp</p>
      </div>
      {children}
    </div>
  );
});
