import { UnistUtilTraceRunner } from "../types/runner"
import { Tree } from "../types/tree"
import { TreeBeforeVFile } from "../types/tree-before-vfile"

export const logMessages = (): UnistUtilTraceRunner => {
  //const name = options?.name ?? ''
  return (_tree: Tree, _file: TreeBeforeVFile): void => {
    // print all current messages
  }
}
