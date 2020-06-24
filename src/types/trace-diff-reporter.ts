import { VFile } from "vfile"
import { Tree } from "./tree"

export interface TraceDiffReporter {
  (left: Tree, right: Tree, file: VFile): string
}
