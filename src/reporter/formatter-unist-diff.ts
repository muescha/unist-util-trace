// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Patch,
  PatchInsert,
  PatchLeftNode,
  PatchOrder,
  PatchProps,
  PatchRemove,
  PatchReplace,
  PatchRightNode,
  PatchText,
  Result,
} from "unist-diff"
import { VFile } from "vfile"
import chalk, { Chalk } from "chalk"
import inspect from "unist-util-inspect"
import { wrapArray } from "../utils/wrap-array"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const formatterUnistDiff = (result: Result, _file: VFile): string => {
  const report: string[] = []

  const isPatchRightNode = (
    patch: Patch
  ): patch is PatchInsert | PatchReplace | PatchText => {
    return (
      !Array.isArray(patch) &&
      // TODO find a better way to find out if it is a PAtchRgihtNode
      //      [PatchType.insert, PatchType.replace, PatchType.text].includes(patch.type)
      (patch as PatchRightNode).right !== undefined
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
      !Array.isArray(patch) &&
      //[PatchType.remove, PatchType.replace, PatchType.props, PatchType.text, PatchType.order].includes(patch.type)
      (patch as PatchLeftNode).left !== undefined
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
      const valueArray = wrapArray(objectValue)

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
            report.push(
              prefix(
                prefixText,
                color,
                inspect(value.left, { showDataPretty: true })
              )
            )
          }
          if (value.right && isPatchRightNode(value)) {
            const prefixText = `${info} right: `
            report.push(
              prefix(
                prefixText,
                color,
                inspect(value.right, { showDataPretty: true })
              )
            )
          }
        }
      })
    }
  }
  return report.join("\n")
}
