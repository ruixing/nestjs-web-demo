/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const total = nums1.length + nums2.length;
  const mergeRes = [];
  let i = 0, j = 0, k = 0;
  
  while (k < Math.floor(total / 2) + 1) {
    if (i < nums1.length && j < nums2.length) {
      if (nums1[i] <= nums2[j]) {
        mergeRes.push(nums1[i++]);
      } else {
        mergeRes.push(nums2[j++]);
      }
    } else if (i >= nums1.length) {
      mergeRes.push(nums2[j++]);
    } else {
      mergeRes.push(nums1[i++]);
    }
    k++;
  }

  if (total % 2 === 0) {
    return (mergeRes.pop() + mergeRes.pop()) / 2;
  } else {
    return mergeRes.pop();
  }
};


console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 3, 5], [2, 4, 6, 8, 10]));