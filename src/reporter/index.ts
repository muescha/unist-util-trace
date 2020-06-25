import { TraceDiffReporter } from "../types/trace-diff-reporter"

import { reporterUnistDiff } from "./reporter-unist-diff"
import { reporterDiffJson } from "./reporter-diff-json"
import { reporterDiffLinesUnistInspect } from "./reporter-diff-lines-unist-inspect"
import { reporterJsonDiffPatch } from "./reporter-json-diff-patch"

export const definedReporters: { [key: string]: TraceDiffReporter } = {
  "unist-diff": reporterUnistDiff,
  "diff-json": reporterDiffJson,
  "diff-inspect-full": reporterDiffLinesUnistInspect.full,
  "diff-inspect-plain": reporterDiffLinesUnistInspect.plain,
  "json-diff-patch": reporterJsonDiffPatch,
}
