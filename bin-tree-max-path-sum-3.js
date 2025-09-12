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
  const res = { max: -Infinity };
  postOrder(root,res);
  return res.max;
};

const postOrder = (root, res) => {
  const maxLeft = root.left ? postOrder(root.left, res) : -Infinity;
  const maxRight = root.right ? postOrder(root.right, res) : -Infinity;
  
  const value = root.val;
  const max = Math.max(value, value + maxLeft, value + maxRight)

  res.max = Math.max(res.max, max, value + maxLeft + maxRight);

  return max;
}