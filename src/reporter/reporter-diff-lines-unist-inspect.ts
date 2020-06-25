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
  showDataPretty?: true
}

const inspectOptions: { [key: string]: InspectOptions } = {
  plain: {
    showPositions: false,
    showIndex: false,
    showChildCount: false,
    showDataPretty: true,
  },
  full: {
    showDataPretty: true,
  },
}

const reporterDiffLinesUnistInspectCustom = (
  left: Tree,
  right: Tree,
  file: VFile,
  options: InspectOptions = {}
): string => {
  const resultUnistInspect: Change[] = diff.diffLines(
    inspect(left, options),
    inspect(right, options)
  )
  return formatterDiff(resultUnistInspect)
}

const reporterDiffLinesUnistInspectPlain: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  file: VFile
): string =>
  reporterDiffLinesUnistInspectCustom(left, right, file, inspectOptions.plain)

const reporterDiffLinesUnistInspectFull: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  file: VFile
): string =>
  reporterDiffLinesUnistInspectCustom(left, right, file, inspectOptions.full)

export const reporterDiffLinesUnistInspect: {
  [key: string]: TraceDiffReporter
} & { options?: InspectOptions } = {
  custom: reporterDiffLinesUnistInspectCustom,
  plain: reporterDiffLinesUnistInspectPlain,
  full: reporterDiffLinesUnistInspectFull,
}
