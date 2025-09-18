/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} limit
 * @return {number}
 */
var maxProduct = function(nums, k, limit) {
  const stack = []
  const maxAlterCache = new Map();
  let lastZeroIndex = -1;
  let max = -1;

  for (let i = 0; i < nums.length; i++) {
    stack.push({ total: nums[i], product: nums[i], count: 1, index: i });
    if (nums[i] === 0) {
      lastZeroIndex = i;
    }
  }

  while (stack.length > 0) {
    const { total, count, product, index } = stack.pop();
    for (let i = index + 1; i < nums.length; i++) {
      const num = nums[i];

      if ((product * num > limit && (lastZeroIndex < i || max >= 0)) || (product * num === 0 && max >= 0)) {
        continue;
      }

      if (i < nums.length - 1) {
        const maxAlterNext = maxAlterCache.has(i) ? maxAlterCache.get(i) : maxAlternatingSum(nums.slice(i));
        const maxAlterNextTwo = maxAlterCache.has(i + 1) ? maxAlterCache.get(i + 1) : maxAlternatingSum(nums.slice(i + 1));

        maxAlterCache.set(i, maxAlterNext);
        maxAlterCache.set(i + 1, maxAlterNextTwo);

        if (count % 2 === 0 && (k > total + maxAlterNext || k < total + num - maxAlterNextTwo)) {
          continue;
        } else if (count % 2 === 1 && (k < total - maxAlterNext || k > total - num + maxAlterNextTwo)) {
          continue;
        }
      }

      stack.push({
        total: count % 2 === 0 ? total + num : total - num,
        product: product * num,
        count: count + 1,
        index: i
      })
    }

    if (max === limit) {
      break;
    }

    if (total === k && product <= limit) {
      max = Math.max(max, product);
    }
  }

  console.log('max', max);
  return max;
}

const maxAlternatingSum = function(nums) {
  let total = 0;
  let count = 0;
  let last = 0;
  for (const num of nums) {
    if (count % 2 === 0 && num >= last) {
      total += num - last;
    } else if (count % 2 === 0 && num < last) {
      count++;
    } else if (count % 2 === 1 && num > last) {
      total += num - last;
      count++;
    }
    last = num;
  }
  return total;
};

maxProduct([7,8,12,2,9,0,5,12,10,1,11,9,5,9,7,12,12,12,6,7,5,7,9,2,7,7,11,8,9,1,6,12,11,6,1,4,2,6,5,4], 15, 100)
// maxProduct([1,2,3], 2, 10);
maxProduct([0, 8], -8, 10);


// maxProduct([1, 2, 3, 4, 5], 5, 100);