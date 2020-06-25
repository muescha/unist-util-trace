import { TraceDiffReporter } from "../types/trace-diff-reporter"
import { Tree } from "../types/tree"
import { VFile } from "vfile"
import jsonDiffPatch from "jsondiffpatch"
import { formatterJsonDiffPatch } from "./formatter-json-diff-patch"

export const reporterJsonDiffPatch: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _file: VFile
): string => {
  const resultJsonDiffPatch = jsonDiffPatch.diff(left, right)
  return formatterJsonDiffPatch(resultJsonDiffPatch)
}
