import chalk from "chalk"

import * as path from "path"
import { Tree } from "./types/tree"
import { TreeBeforeVFile } from "./types/tree-before-vfile"
import { definedReporters } from "./reporter"
import { wrapArray } from "./utils/wrap-array"

export interface UnistUtilTraceDiffOptions {
  reporter?: string | string[]
}

export type UnistUtilTraceDiffRunner = (
  tree: Tree,
  file: TreeBeforeVFile
) => void

export const unistUtilTraceDiff = (
  options: UnistUtilTraceDiffOptions
): UnistUtilTraceDiffRunner => {
  const defaultReporter = ["unist-diff"]
  const reporters: string[] =
    options && options.reporter ? wrapArray(options.reporter) : defaultReporter

  return (tree: Tree, file: TreeBeforeVFile): void => {
    if (file.data.treeBefore) {
      const before: Tree = file.data.treeBefore
      const after: Tree = tree
      const equal = JSON.stringify(before) === JSON.stringify(tree)
      if (!equal) {
        const fullPath = path.join(file.cwd, file.path ?? "")
        console.log("")
        console.log(chalk.yellow(fullPath))
        reporters.forEach((name) => {
          const reporter = definedReporters[name]
          if (reporter !== undefined) {
            console.log(chalk.grey(`Running reporter '${name}' ...`))
            console.log(reporter(before, after, file))
            console.log(chalk.grey(`Finished reporter '${name}'.\n`))
          } else {
            console.log(chalk.red(`Reporter '${name}' not found`))
          }
        })
      } else {
        // if there are many tracepoints only print file name at first
        if (!file.data.unistUtilDebugFilePathPrinted) {
          const fullPath = path.join(file.cwd, file.path ?? "")
          console.log(chalk.grey(fullPath))
        }
        file.data.unistUtilDebugFilePathPrinted = true
      }
    }
    file.data.treeBefore = JSON.parse(JSON.stringify(tree))
  }
}
