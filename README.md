# unist-util-trace

[![Chat][chat-badge]][chat]

[**unist**][unist] utility to trace changes while processing

## Install

[npm][]:

```shell
npm install unist-util-trace
```

## Usage

### Minimal usage

To achieve optimal usage, employ the `() => syntax`. Apply these tracepoints to the chain. Upon the initial call, only the tree is stored for comparison. Upon subsequent calls, it displays a diff relative to the previously saved unist tree.

```js
.use(() => unistUtilTrace.diff()) // first call: save tree
//...
.use(() => unistUtilTrace.diff()) // second call: show diff
```



```js
const { unistUtilTrace } = require("unist-util-trace")
const traceDiffSettings = {
  reporter: ["unist-diff"]
}
```

```js
module.exports = {
  plugins: [
    ["remark-frontmatter", "yaml"],
    [
      "remark-retext",
      unified()
        .use(require("retext-english"))
        .use(require("retext-syntax-urls"))
        .use(() => unistUtilTrace.diff(traceDiffSettings))  // first to set tracepoint
        .use(require("retext-syntax-mentions"), { style: /^@[\w-]{1,40}$/ })
        .use(() => unistUtilTrace.diff(traceDiffSettings)) // second to see diffs from mentions
        .use(require("retext-emoji"))
        .use(() => unistUtilTrace.diff(traceDiffSettings)) // third to see diffs in retext-emoji
```

## Reporter

### available reporters:

```js
const traceDiffSettings = {
  reporter: [ "unist-diff", 
              "diff-json", 
              "diff-inspect-full", 
              "diff-inspect-plain", 
              "json-diff-patch"
            ]
}
```

### Reporter `unist-diff`

using [unist-diff](https://github.com/syntax-tree/unist-diff)
 
### Reporter `diff-json`

using [`diff.json`](https://github.com/kpdecker/jsdiff)

### Reporter `diff-inspect-full`

using [unist-util-inspect](https://github.com/syntax-tree/unist-util-inspect) without options and then [`diff.diffLines`](https://github.com/kpdecker/jsdiff)

### Reporter `diff-inspect-plain`

using [unist-util-inspect](https://github.com/syntax-tree/unist-util-inspect) with options for less noise and then [`diff.diffLines`](https://github.com/kpdecker/jsdiff)
 
### Reporter `json-diff-patch`

using [`jsondiffpatch`](https://github.com/benjamine/jsondiffpatch) with the console formatter


## Logger

### Logger `logDot`

show a dot for each file

new line after 100 items

### Logger `logFileName`

show current file name

- `newLine`: false -> change current line
- `newLine`: true -> each name on a new line


### Logger `logNodeInspect`

log all `nodeType` nodes with `inspect`

### Logger `logTreeeInspect`

run `inspect` on the current `tree`

## API

### 

## Related

- [`retext-syntax-mentions`](https://github.com/retextjs/retext-syntax-mentions)
  — retext plugin to classify @mentions as syntax, not natural language

- [`retext-emoji`](https://github.com/retextjs/retext-emoji)
  — retext plugin to support emoji, gemoji, and emoticons

## License

[MIT][license] © [Michael Nietzold / Muescha](https://github.com/muescha/unist-util-trace)

<!-- Definition -->

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg
[chat]: https://spectrum.chat/unified/syntax-tree
[npm]: https://docs.npmjs.com/cli/install
[license]: license
[unist]: https://github.com/syntax-tree/unist
