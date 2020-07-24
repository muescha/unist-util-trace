import { UnistUtilTraceRunner } from "../types/runner"
import { Tree } from "../types/tree"
import { TreeBeforeVFile } from "../types/tree-before-vfile"
import path from "path"
import chalk from "chalk"

export interface UnistUtilTraceLogFileNameOptions {
  newLine?: boolean
}

export const logFileName = (
  options: UnistUtilTraceLogFileNameOptions
): UnistUtilTraceRunner => {
  const newLine = options?.newLine ?? true
  return (tree: Tree, file: TreeBeforeVFile): void => {
    const fullPath = "  " + path.join(file.cwd, file.path ?? "")
    if (newLine) {
      console.log(chalk.grey(fullPath))
    } else {
      process.stdout.clearLine(0)
      process.stdout.write(chalk.grey(fullPath) + "\r")
    }
  }
}
