import { useLayoutEffect, useState } from "react";
import { Filter, unmount } from "hypercomp";
import { css } from "hypercomp";
import { Effect } from "hypercomp";

export function useFilter(filter: Filter | Effect) {
  const [filterKey] = useState(crypto.randomUUID());
  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    setUrl(css(filter, filterKey));

    return () => {
      unmount(filterKey);
    };
  }, [filter, filterKey]);

  return url;
}
