/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} limit
 * @return {number}
 */
var maxProduct = function(nums, k, limit) {
  const stack = []
  let max = -1;

  for (let i = 0; i < nums.length; i++) {
    stack.push({ total: nums[i], product: nums[i], count: 1, index: i })
  }

  while (stack.length > 0) {
    const { total, count, product, index } = stack.pop();
    for (let i = index + 1; i < nums.length; i++) {
      const num = nums[i];
      stack.push({
        total: count % 2 === 0 ? total + num : total - num,
        product: product * num,
        count: count + 1,
        index: i
      })
    }

    if (total === k && product <= limit) {
      max = Math.max(max, product);
    }
  }

  console.log('max', max);
  return max;
}

// maxProduct([7,8,12,2,9,0,5,12,10,1,11,9,5,9,7,12,12,12,6,7,5,7,9,2,7,7,11,8,9,1,6,12,11,6,1,4,2,6,5,4], 15, 100);