### Current Usage

```javascript
.use(
     () => unistUtilTraceDiff({
                reporter: [
                             "unist-diff",
                             "diff-json",
                             "diff-inspect-full",
                             "diff-inspect-plain",
                             "json-diff-patch"
                           ]
           })
 )
```

### TODO

i like to have the Reporter in separate Packages, so that only the needed diff packages are loaded and not all

```javascript
.use(
     () => unistUtilTraceDiff({
               showLines: true,            // hide the grey filenames
               addFileInfoOnInsert: true,  // add FileMessage for inserts in reporter unist-diff
               reporter: [
                           require('unist-util-trace-diff-reporter-diff-json]),
                           require('unist-util-trace-diff-reporter-diff-lines-unist-inspect']),
                           require('unist-util-trace-diff-reporter-json-diff-patch']),
                           require('unist-util-trace-diff-reporter-unist-diff']),
                         ]
           })
 )
```
