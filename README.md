# unist-util-trace-diff

[![Chat][chat-badge]][chat]

[**unist**][unist] utility to trace changes while processing

## Install

[npm][]:

```bash
npm install unist-util-trace-diff
```

## Usage

### Minimal usage

The minimal use is note you need use the `() =>` syntax. Apply this tracepoints to the chain. On the first call only the tree is saved for a diff. On subsequent calls it shows a diff to the previous saved unist tree: 
```js
.use(() => unistUtilTraceDiff()) // first call: save tree
...
.use(() => unistUtilTraceDiff()) // second call: show diff
```



```js
const { unistUtilTraceDiff } = require("unist-util-trace-diff")
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
        .use(() => unistUtilTraceDiff(traceDiffSettings))  // first to set tracepoint
        .use(require("retext-syntax-mentions"), { style: /^@[\w-]{1,40}$/ })
        .use(() => unistUtilTraceDiff(traceDiffSettings)) // second to see diffs from mentions
        .use(require("retext-emoji"))
        .use(() => unistUtilTraceDiff(traceDiffSettings)) // third to see diffs in retext-emoji
```


## available reporters:

```js
constxtraceDiffSettings = {
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

## API

### 

## Related

- [`retext-emoji`](https://github.com/retextjs/retext-syntax-mentions)
  — retext plugin to classify @mentions as syntax, not natural language

- [`retext-emoji`](https://github.com/retextjs/retext-emoji)
  — retext plugin to support emoji, gemoji, and emoticons

## License

[MIT][license] © [Michael Nietzold / Muescha](https://github.com/muescha/unist-util-trace-diff)

<!-- Definition -->

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg
[chat]: https://spectrum.chat/unified/syntax-tree
[npm]: https://docs.npmjs.com/cli/install
[license]: license
[unist]: https://github.com/syntax-tree/unist
