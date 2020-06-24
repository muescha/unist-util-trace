import { Tree } from "../types/tree"
import { VFile } from "vfile"
import diff from "diff"
import { formatterDiff } from "./formatter-diff"

export function reporterDiffJson(
  left: Tree,
  right: Tree,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _file: VFile
): string {
  const resultDiff = diff.diffJson(left, right)
  return formatterDiff(resultDiff)
}
