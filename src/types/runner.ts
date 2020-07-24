import { Tree } from "./tree"
import { TreeBeforeVFile } from "./tree-before-vfile"

export type UnistUtilTraceRunner = (tree: Tree, file: TreeBeforeVFile) => void
