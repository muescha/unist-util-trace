import jsonDiffPatch, { Delta } from "jsondiffpatch"

export function formatterJsonDiffPatch(
  resultJsonDiffPatch: Delta | undefined
): string {
  return resultJsonDiffPatch
    ? jsonDiffPatch.formatters.console.format(resultJsonDiffPatch, null)
    : ""
}
