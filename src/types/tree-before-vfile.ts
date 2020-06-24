import { VFile } from "vfile"
import { Tree } from "./tree"

export interface TreeBeforeVFile extends VFile {
  data: {
    treeBefore?: Tree
    unistUtilDebugFilePathPrinted?: boolean
  }
}
