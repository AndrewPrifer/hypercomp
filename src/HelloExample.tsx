import { useFilter } from "hypercomp/react";
import { Effect, Filter } from "hypercomp";

export function HelloExample({
  effect,
  className = "",
}: {
  effect: Effect | Filter;
  className?: string;
}) {
  return (
    <div className={`size-full overflow-hidden min-h-[400px] ${className}`}>
      <div
        className="size-full grid place-items-center"
        style={{
          filter: useFilter(effect),
        }}
      >
        <div
          contentEditable
          spellCheck={false}
          className="focus:outline-none italic"
          style={{
            fontSize: "200px",
            fontWeight: 900,
          }}
        >
          Hello!
        </div>
      </div>
    </div>
  );
}
