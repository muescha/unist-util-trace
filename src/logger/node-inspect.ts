import { UnistUtilTraceRunner } from "../types/runner"
import { Tree } from "../types/tree"
import { TreeBeforeVFile } from "../types/tree-before-vfile"
import visit from "unist-util-visit"
import { Node } from "unist"
import inspect from "unist-util-inspect"
import source from "unist-util-source"

export interface UnistUtilTraceLogNodeInspectOptions {
  nodeType?: string
}

export const logNodeInspect = (
  options: UnistUtilTraceLogNodeInspectOptions
): UnistUtilTraceRunner => {
  const nodeType = options?.nodeType ?? ""
  return (tree: Tree, file: TreeBeforeVFile): void => {
    visit(tree, nodeType, visitor)

    function visitor(node: Node): void {
      const nodeInspected = inspect(node, { showDataPretty: true })
      const nodeSource = source(node, file)
      if (nodeSource.startsWith("`")) {
        return
      }

      console.log(nodeSource + " --> " + nodeInspected)

      // fs.appendFileSync(`./list-all-${nodeType}.txt`,nodeSource + "\n")
    }
  }
}
