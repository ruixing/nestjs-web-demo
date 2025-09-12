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
  if (!root) {
    return -Infinity;
  } else if (!root.left && !root.right) {
    return root.val;
  }

  const left = [];
  const right = [];
  const nodeStack = [{current: root, sum: root.val, position: 'middle'}];

  while (nodeStack.length) {
    const { current, sum, position } = nodeStack.shift();
    if (current.left) {
      nodeStack.push({
        current: current.left,
        sum: current.left.val + sum,
        position: position === 'middle' ? 'left' : position
      });
    }
    if (current.right) {
      nodeStack.push({
        current: current.right,
        sum: current.right.val + sum,
        position: position === 'middle' ? 'right' : position
      });
    }
    switch (position) {
      case 'left':
        left.push(sum);
        break;
      case 'right':
        right.push(sum);
        break;
    }
  }

  const maxLeft = Math.max(...left, -Infinity);
  const maxRight = Math.max(...right, -Infinity);
  const max = Math.max(maxLeft, maxRight, root.val, maxLeft + maxRight - root.val);

  return Math.max(max, ...(root ? [maxPathSum(root.left), maxPathSum(root.right)] : []));
};