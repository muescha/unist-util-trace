import { Parent } from "unist"
import { VFile } from "vfile"

import chalk, {Chalk} from "chalk"

import * as  path from "path"

import inspect from "unist-util-inspect"

import jsonDiffPatch from "jsondiffpatch"

import unistDiff, {
  Patch,
  PatchInsert, PatchOrder, PatchProps,
  PatchRemove,
  PatchReplace,
  PatchRightNode,
  PatchText,
  PatchType,
  Result
} from "unist-diff"

import diff, { Change } from "diff"

type Tree = Parent

interface TreeBeforeVFile extends VFile {
  data: {
    treeBefore?: Tree;
    unistUtilDebugFilePathPrinted?: boolean;
  };
}


const printDiff = (result: Change[]): void => {
  const prefix = (prefix: string, text: string): string => prefix + text.split(`\n`).join(`\n${prefix}`)

  result.forEach(part => {
    const color = part.added
      ? chalk.green
      : part.removed
        ? chalk.red
        : chalk.grey
    const prefixText = part.added ? `+ ` : part.removed ? `- ` : `  `
    if (part.count && part.count < 200) {
      console.log(color(prefix(prefixText, part.value)))
    }
  })
}

function reporterJsDiff(left: Tree, right: Tree, file: VFile) {
  const resultDiff = diff.diffJson(left, right)
  printDiff(resultDiff)
}

function reporterUnistInspectDiff(left: Tree, right: Tree, file: VFile) {
  const inspectOptions = {
    showPositions: false,
    showIndex: false,
    showChildCount: false,
  }
  const resultUnistInspect: Change[] = diff.diffLines(
    inspect(left, inspectOptions),
    inspect(right, inspectOptions)
  )
  const resultUnistInspect2: Change[] = diff.diffLines(
    inspect(left),
    inspect(right)
  )
  printDiff(resultUnistInspect)
  printDiff(resultUnistInspect2)
}

function reporterJsonDiffPath(left: Tree, right: Tree, file: VFile) {
  const resultJsonDiffPatch = jsonDiffPatch.diff(left, right)
  if (resultJsonDiffPatch) {
    jsonDiffPatch.formatters.console.format(resultJsonDiffPatch, null)
  }
}

function reporterUnistDiff(left: Tree, right: Tree, file: VFile) {
  const printUnistDiff = (result: Result, file: VFile) => {

    const isPatchRightNode = (patch: Patch): patch is PatchInsert | PatchReplace | PatchText => {
      return !Array.isArray(path) && [PatchType.insert,PatchType.replace,PatchType.text].includes(patch.type)
    }
    const isPatchLeftNode = (patch: Patch): patch is PatchRemove | PatchReplace | PatchProps | PatchText | PatchOrder => {
      return !Array.isArray(path) && [PatchType.remove,PatchType.replace,PatchType.props, PatchType.text, PatchType.order].includes(patch.type)
    }

    const prefix = (prefix: string, color: Chalk, text: string) => {
      const prefixOther = ' '.repeat(Math.max(prefix.length - 2, 0)) + `> `
      return (
        color(prefix.padStart(30, ` `)) +
        text.split(`\n`).join(`\n${color(prefixOther.padStart(30, ` `))}`)
      )
    }
    const fullPath = path.join(file.cwd, file.path ?? '')
    console.log()
    console.log(chalk.yellow(fullPath))

    for (const [key, objectValue] of Object.entries(result)) {
      if (key !== `left`) {
        if (Array.isArray(objectValue)) {
          console.log(
            chalk.red(`key ${key} is an array[${objectValue.length}] ...`)
          )
        }
        const valueArray = Array.isArray(objectValue)
          ? objectValue
          : [objectValue] //x-is-array
        valueArray.forEach(value => {
          if(value){
          const color =
            value.type === `insert`
              ? chalk.green
              : value.type === `remove`
              ? chalk.red
              : chalk.grey
          const info = `${key}: ${value.type}`
          if (value.type === `insert`) {
            console.log(``)
            // file.info(`changed value '${value.right.value}' to '${value.right.type}'`, value.right.position)
          }
          if (value.left && isPatchLeftNode(value)) {
            const prefixText = `${info}  left: `
            console.log(prefix(prefixText, color, inspect(value.left)))
          }
          if (value.right && isPatchRightNode(value)) {
            const prefixText = `${info} right: `
            console.log(prefix(prefixText, color, inspect(value.right)))
          }
        }
        }
        )
      }
    }
  }
  const resultUnistDiff = unistDiff(left, right)
  printUnistDiff(resultUnistDiff, file)
}

export const unistUtilTraceDiff = (tree: Tree, file: TreeBeforeVFile): void => {
  // .use(unistToolTrace, {
  //      showLines: true,
  //      addFileInfoOnInsert: true,
  //      reporter: [
  //                  require('unist-util-debug-reporter-unist-diff]),
  //                  require('unist-util-debug-reporter-jsonDiffPatch]),
  //                  require('unist-util-debug-reporter-jsDiff]),
  //     })

  if (file.data.treeBefore) {
    const before: Tree = file.data.treeBefore
    const after: Tree = tree
    const equal = JSON.stringify(before) === JSON.stringify(tree)
    if (!equal) {
      reporterUnistDiff(before, after, file)
      const a = false
      if (a) {
        reporterJsDiff(before, after, file)
        reporterUnistInspectDiff(before, after, file)
        reporterJsonDiffPath(before, after, file)
      }
      console.log()
    } else {
      if (!file.data.unistUtilDebugFilePathPrinted) {
        const fullPath = path.join(file.cwd, file.path ?? '')
        console.log(chalk.grey(fullPath))
      }
      file.data.unistUtilDebugFilePathPrinted = true
    }
  }
  file.data.treeBefore = JSON.parse(JSON.stringify(tree))
}
