import { Change } from "diff"
import chalk from "chalk"

export const formatterDiff = (result: Change[]): string => {
  const report: string[] = []
  const prefix = (prefix: string, text: string): string =>
    prefix + text.split(`\n`).join(`\n${prefix}`)

  result.forEach((part) => {
    const color = part.added
      ? chalk.green
      : part.removed
      ? chalk.red
      : chalk.grey
    const prefixText = part.added ? `+ ` : part.removed ? `- ` : `  `
    if (part.count && part.count < 200) {
      report.push(color(prefix(prefixText, part.value)))
    }
  })
  return report.join("\n")
}
