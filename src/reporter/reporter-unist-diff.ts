import { VFile } from "vfile"
import unistDiff, {
  Patch,
  PatchInsert,
  PatchOrder,
  PatchProps,
  PatchRemove,
  PatchReplace,
  PatchText,
  Result,
} from "unist-diff"
import path from "path"
import chalk, { Chalk } from "chalk"
import { Tree } from "../types/tree"
import { TraceDiffReporter } from "../types/trace-diff-reporter"
import inspect from "unist-util-inspect"

const wrapArray = <V>(value: V | V[]): V[] =>
  Array.isArray(value) ? value : [value]

const formatterUnistDiff = (result: Result, file: VFile): string => {
  const report: string[] = []
  const isPatchRightNode = (
    patch: Patch
  ): patch is PatchInsert | PatchReplace | PatchText => {
    return (
      !Array.isArray(path) && ["insert", "replace", "text"].includes(patch.type)
    )
  }
  const isPatchLeftNode = (
    patch: Patch
  ): patch is
    | PatchRemove
    | PatchReplace
    | PatchProps
    | PatchText
    | PatchOrder => {
    return (
      !Array.isArray(path) &&
      ["remove", "replace", "props", "text", "order"].includes(patch.type)
    )
  }

  const prefix = (prefix: string, color: Chalk, text: string): string => {
    const prefixOther = " ".repeat(Math.max(prefix.length - 2, 0)) + `> `
    return (
      color(prefix.padStart(30, ` `)) +
      text.split(`\n`).join(`\n${color(prefixOther.padStart(30, ` `))}`)
    )
  }

  for (const [key, objectValue] of Object.entries(result)) {
    if (key !== `left`) {
      if (Array.isArray(objectValue)) {
        report.push(
          chalk.red(
            `Note: The key '${key}' is an Array[${objectValue.length}] ...`
          )
        )
      }
      const valueArray = wrapArray(objectValue) // type wird nicht erkannt :(
      // const valueArray = Array.isArray(objectValue)
      //   ? objectValue
      //   : [objectValue] //x-is-array
      valueArray.forEach((value) => {
        if (value) {
          const color =
            value.type === `insert`
              ? chalk.green
              : value.type === `remove`
              ? chalk.red
              : chalk.grey
          const info = `${key}: ${value.type}`
          if (value.type === `insert`) {
            report.push(``)
            // file.info(`changed value '${value.right.value}' to '${value.right.type}'`, value.right.position)
          }
          if (value.left && isPatchLeftNode(value)) {
            const prefixText = `${info}  left: `
            report.push(prefix(prefixText, color, inspect(value.left)))
          }
          if (value.right && isPatchRightNode(value)) {
            const prefixText = `${info} right: `
            report.push(prefix(prefixText, color, inspect(value.right)))
          }
        }
      })
    }
  }
  return report.join("\n")
}

export const reporterUnistDiff: TraceDiffReporter = (
  left: Tree,
  right: Tree,
  file: VFile
): string => {
  const resultUnistDiff = unistDiff(left, right)
  return formatterUnistDiff(resultUnistDiff, file)
}
