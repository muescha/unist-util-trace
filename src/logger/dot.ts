import { UnistUtilTraceRunner } from "../types/runner"
import { Tree } from "../types/tree"
import { TreeBeforeVFile } from "../types/tree-before-vfile"
import chalk from "chalk"

export const logDot = (): UnistUtilTraceRunner => {
  let index = 0
  return (_tree: Tree, _file: TreeBeforeVFile): void => {
    process.stdout.write(index++ % 10 ? chalk.grey(".") : chalk.yellow("."))
    if (!(index % 100)) {
      process.stdout.write(chalk.red("| " + index) + "\n")
    }
  }
}
