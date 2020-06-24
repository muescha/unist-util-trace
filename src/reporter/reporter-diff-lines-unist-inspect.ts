import { TraceDiffReporter } from "../types/trace-diff-reporter"
import { Tree } from "../types/tree"
import { VFile } from "vfile"
import diff, { Change } from "diff"
import inspect from "unist-util-inspect"
import { formatterDiff } from "./formatter-diff"

interface InspectOptions {
  showPositions?: boolean
  showIndex?: boolean
  showChildCount?: boolean
}

function reporterDiffLinesUnistInspect(
  left: Tree,
  right: Tree,
  file: VFile,
  options: InspectOptions = {}
): string {
  const resultUnistInspect: Change[] = diff.diffLines(
    inspect(left, options),
    inspect(right, options)
  )
  return formatterDiff(resultUnistInspect)
}

export const reporterDiffLinesUnistInspectPlain: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  file: VFile
): string => {
  const inspectOptions: InspectOptions = {
    showPositions: false,
    showIndex: false,
    showChildCount: false,
  }
  return reporterDiffLinesUnistInspect(left, right, file, inspectOptions)
}
export const reporterDiffLinesUnistInspectFull: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  file: VFile
): string => reporterDiffLinesUnistInspect(left, right, file)
