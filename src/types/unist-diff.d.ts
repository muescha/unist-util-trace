// declare module 'unist-diff' {
//
// }
// export as namespace UnistDiff;


///export as namespace UnistDiff


// import {Node, Parent} from "unist"

declare module "unist-diffx" {
  import {Node, Parent} from "unist"
  export namespace UnistDiff {

  }
}
// declare module "unist-diff";

// declare module "unist-diff" {
//   export interface UR {
//     name: string;
//   }
// }

declare module "unist-diff" {

  import {Node, Parent} from "unist"
  /*
  ### Type `PropsDiff`

    `PropsDiff` is an object mapping keys to new values.

  In the diff:

    *   If a key is removed, the key’s value is set to `undefined`
  *   If the new value and the old value are both plain objects, the key’s
  value is set to a `PropsDiff` of both values
  *   In all other cases, the key’s value is set to the new value

   */
  export interface PropsDiffRemoved {
    [key: string]: undefined;
  }

  export interface PropsDiffPlain {
    [key: string]: PropsDiff;
  }

  export interface PropsDiffOther {
    [key: string]: string;
  }

  type PropsDiff = PropsDiffRemoved | PropsDiffPlain | PropsDiffOther

  /*
    `MoveDiff` is an object with two arrays: `removes` and `inserts`.
    They always have equal lengths, and are never both empty.  Objects in
  `inserts` and `removes` have the following properties:
  *   `left` ([`Node`][node]) — The moved node

  *   `right` (`number`) — The index this node moved from (when in `removes`) or
  to (when in `inserts`)


   */
  export interface MoveDiffItem {
    left: Node;
    right: number;
  }

  export interface MoveDiff {
    inserts: MoveDiffItem[];
    removes: MoveDiffItem[];
  }

  export enum PatchType {
    remove = "remove",
    insert = "insert",
    replace = "replace",
    props = "props",
    text = "text",
    order = "order",
  }

  export interface PatchLeftNode {
    left: Node;
  }
  export interface PatchRightNode {
    right: Node;
  }

  export interface PatchRemove extends PatchLeftNode{
    type: PatchType.remove;
    // left: Node; PatchLeftNode
    right: null;
  }

  export interface PatchInsert extends PatchRightNode{
    type: PatchType.insert;
    left: null;
    // right: Node;
  }

  export interface PatchReplace extends PatchLeftNode, PatchRightNode{
    type: PatchType.replace;
    // left: Node;
    // right: Node;
  }

  export interface PatchProps extends PatchLeftNode{
    type: PatchType.props;
    // left: Node;
    right: PropsDiff;
  }

  export interface PatchText extends PatchLeftNode, PatchRightNode{
    type: PatchType.text;
    // left: Node;
    // right: Node;
  }

  export interface PatchOrder extends PatchLeftNode{
    type: PatchType.order;
    // left: Node;
    right: MoveDiff;
  }

  export type Patch = PatchRemove | PatchInsert | PatchReplace | PatchProps | PatchText | PatchOrder;

  export interface ResultLeft {
    "left": Parent;
  }

  export interface ResultMap {
    [index: string]: Patch | Patch[];
  }

//export type ResultLeftOrMap = ResultLeft & ResultMap;
// export interface Result {
//   [index: string]: Patch | Patch[];
// } & { left: Parent; }
  export type Result = {
    [P in keyof ResultMap]?: ResultMap[P];
  } & ResultLeft;

  export default function(left: Parent, right: Parent): Result
}

// export as namespace UnistDiff;
