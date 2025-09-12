/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
  const nodeStack = [];
  let max = -Infinity;
  let parent = {
    node: root,
    leftVisited: false,
    rightVisited: false
  };

  while (parent && parent.node) {
    const { node, leftVisited, rightVisited } = parent;

    if (node.left && !leftVisited) {
      parent.leftVisited = true;
      nodeStack.push(parent);
      parent = {
        node: node.left,
        leftVisited: false,
        rightVisited: false,
        isLeft: true
      };
    } else if (node.right && !rightVisited) {
      parent.rightVisited = true;
      nodeStack.push(parent);
      parent = {
        node: node.right,
        leftVisited: false,
        rightVisited: false,
        isRight: true
      };
    } else {
      const { leftMax = -Infinity, rightMax = -Infinity, isLeft, isRight } = parent;
      const currentMax = Math.max(node.val,  node.val + leftMax, node.val + rightMax);
      max = Math.max(max, currentMax, node.val + leftMax + rightMax);
      parent = nodeStack.pop();
      if (parent && isLeft) {
        parent.leftMax = currentMax;
      } else if (parent && isRight) {
        parent.rightMax = currentMax;
      }
    }
  }
  
  return max;
};