import { useLayoutEffect, useState } from "react";
import { Filter, unmount } from "hypercomp";
import { css } from "hypercomp";
import { Effect } from "hypercomp";
import { makeID } from "./utils";

export function useFilter(filter: Filter | Effect) {
  const [filterKey] = useState(makeID());
  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    setUrl(css(filter, filterKey));

    return () => {
      unmount(filterKey);
    };
  }, [filter, filterKey]);

  return url;
}
