import { unistUtilTraceDiff } from "./logger/diff"
import { logFileName } from "./logger/file-name"
import { logNodeInspect } from "./logger/node-inspect"
import { logMessages } from "./logger/messages"
import { logTreeInspect } from "./logger/tree-inspect"
import { logDot } from "./logger/dot"

// import * as fs from "fs"

export const unistUtilTrace = {
  logFileName: logFileName,
  logDot: logDot,
  diff: unistUtilTraceDiff,
  logTreeInspect: logTreeInspect,
  logMessages: logMessages,
  logNodeInspect: logNodeInspect,
}
