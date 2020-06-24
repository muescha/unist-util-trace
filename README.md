# unist-util-trace-diff

[![Chat][chat-badge]][chat]

[**unist**][unist] utility to trace changes while processing

## Install

[npm][]:

```bash
npm install unist-util-trace-diff
```

## Usage

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
        .use(() => unistUtilTraceDiff(traceDiffSettings))
        .use(require("retext-syntax-mentions"), { style: /^@[\w-]{1,40}$/ })
        .use(() => unistUtilTraceDiff(traceDiffSettings))
        .use(require("retext-emoji"))
        .use(() => unistUtilTraceDiff(traceDiffSettings))
```


## available reporters:

```js
constxtraceDiffSettings = {
  reporter: ["unist-diff", "diff-json", "diff-inspect-full", "diff-inspect-plain", "json-diff-patch"]
}

```
## API

### 

## Related

- [`unist-util-filter`](https://github.com/eush77/unist-util-filter)
  — Create a new tree with all nodes that pass a test
- [`unist-util-map`](https://github.com/syntax-tree/unist-util-map)
  — Create a new tree with all nodes mapped by a given function
- [`unist-util-remove`](https://github.com/eush77/unist-util-remove)
  — Remove nodes from a tree that pass a test
- [`unist-util-select`](https://github.com/eush77/unist-util-select)
  — Select nodes with CSS-like selectors

## License

[MIT][license] © [Michael Nietzold / Muescha](https://github.com/muescha/unist-util-trace-diff)

<!-- Definition -->

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg
[chat]: https://spectrum.chat/unified/syntax-tree
[npm]: https://docs.npmjs.com/cli/install
[license]: license
[unist]: https://github.com/syntax-tree/unist
