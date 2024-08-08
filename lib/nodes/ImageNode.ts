import { NodeAPI } from "../NodeAPI";
import { BaseConfig } from "../types";
import { renderAttrs } from "../utils";
import { AbstractNode } from "./AbstractNode";

type ComponentAlign = "Min" | "Mid" | "Max";
type Align = "none" | `x${ComponentAlign}Y${ComponentAlign}`;
type MeetOrSlice = "meet" | "slice";

export interface ImageConfig extends BaseConfig {
  href?: string;
  preserveAspectRatio?: Align | `${Align} ${MeetOrSlice}`;
  crossorigin?: "anonymous" | "use-credentials";
}

export type ShorthandImageConfig = ImageConfig;

export class ImageNode extends AbstractNode<"image", [], ImageConfig> {
  type = "image" as const;

  render() {
    const attrs = renderAttrs(this.config);
    return `<feImage result="${this.id}" ${attrs} />`;
  }
}

export function image(
  href: string,
  config: Omit<ShorthandImageConfig, "href"> = {}
) {
  return new NodeAPI(
    new ImageNode({
      input: [],
      config: {
        ...config,
        href,
      },
    })
  );
}
