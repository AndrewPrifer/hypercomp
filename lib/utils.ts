import { AbstractNode } from "./nodes/AbstractNode";
import { ColorMatrix, ID } from "./types";

/**
 * Build a render queue for a given node by traversing through its dependencies.
 * The render ensures that depended nodes always come before their dependents.
 */
export function buildRenderQueue(node: AbstractNode): AbstractNode[] {
  const uniqueNodes: AbstractNode[] = [];
  const uniqueIds: Set<ID> = new Set();

  function traverseHelper(currentNode: AbstractNode) {
    if (uniqueIds.has(currentNode.id)) {
      // If node already exists, remove and place at the start of the queue, we have a new dependent.
      uniqueNodes.splice(
        uniqueNodes.findIndex((node) => node.id === currentNode.id),
        1
      );
    }

    uniqueNodes.unshift(currentNode);
    uniqueIds.add(currentNode.id);
    currentNode.input.forEach(traverseHelper);
  }

  traverseHelper(node);
  return uniqueNodes;
}

export function mapKeys(config: any, keyMap: any) {
  return Object.entries(config).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [keyMap[key] ? keyMap[key] : key]: value,
    };
  }, {} as any);
}

export function renderAttrs(attrs: {}) {
  return Object.entries(attrs)
    .map(([key, value]) =>
      value !== undefined
        ? `${key}="${Array.isArray(value) ? value.join(", ") : value}"`
        : ""
    )
    .join(" ");
}

export function omitKeys(object: any, keys: string[]) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    return keys.includes(key) ? acc : { ...acc, [key]: value };
  }, {});
}

export function makeID() {
  return Math.random().toString(36).slice(2);
}

export function rgbaMatrixToArray(matrix: ColorMatrix): number[] {
  const rows = ["r", "g", "b", "a"] as const;
  const values: number[] = [];

  for (const row of rows) {
    const {
      r = row === "r" ? 1 : 0,
      g = row === "g" ? 1 : 0,
      b = row === "b" ? 1 : 0,
      a = row === "a" ? 1 : 0,
      o = 0,
    } = matrix[row] || {};

    values.push(r, g, b, a, o);
  }

  return values;
}
