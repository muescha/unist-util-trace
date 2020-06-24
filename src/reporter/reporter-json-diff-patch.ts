import { TraceDiffReporter } from "../types/trace-diff-reporter"
import { Tree } from "../types/tree"
import { VFile } from "vfile"
import jsonDiffPatch, { Delta } from "jsondiffpatch"

function formatterJsonDiffPatch(
  resultJsonDiffPatch: Delta | undefined
): string {
  return resultJsonDiffPatch
    ? jsonDiffPatch.formatters.console.format(resultJsonDiffPatch, null)
    : ""
}

export const reporterJsonDiffPatch: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _file: VFile
): string => {
  const resultJsonDiffPatch = jsonDiffPatch.diff(left, right)
  return formatterJsonDiffPatch(resultJsonDiffPatch)
}
