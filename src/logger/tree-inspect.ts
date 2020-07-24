import { UnistUtilTraceRunner } from "../types/runner"
import { Tree } from "../types/tree"
import { TreeBeforeVFile } from "../types/tree-before-vfile"
import inspect from "unist-util-inspect"

export interface UnistUtilTraceLogTreeInspectOptions {
  name?: string
}

export const logTreeInspect = (
  options: UnistUtilTraceLogTreeInspectOptions
): UnistUtilTraceRunner => {
  const name = options?.name ?? ""
  return (tree: Tree, _file: TreeBeforeVFile): void => {
    const treeInspected = inspect(tree, { showDataPretty: true })
    console.log(name)
    console.log(treeInspected)
  }
}
