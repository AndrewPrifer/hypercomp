import { useEffect, useState } from "react";
import { Filter, unmount } from "hypercomp";
import { css } from "hypercomp";
import { Node } from "hypercomp";

export function useFilter(filter: Filter | Node) {
  const [filterKey] = useState(crypto.randomUUID());

  useEffect(() => {
    css(filter, filterKey);

    return () => {
      unmount(filterKey);
    };
  });

  return css(filter, filterKey);
}
