import { VFile } from "vfile"
import unistDiff from "unist-diff"
import { Tree } from "../types/tree"
import { TraceDiffReporter } from "../types/trace-diff-reporter"
import { formatterUnistDiff } from "./formatter-unist-diff"

export const reporterUnistDiff: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  file: VFile
): string => {
  const resultUnistDiff = unistDiff(left, right)
  return formatterUnistDiff(resultUnistDiff, file)
}
