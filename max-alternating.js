/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function(nums) {
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
  // console.log(total);
  return total;
};


maxAlternatingSum([374,126,84,237,195,139,328,353,286,113,351,167,394,398,29,118,17,162,206,138,34,109,291,368,162,109,336,256,203,330,235,74,136,72,127,382,288,276,135,383,300,220,299,205,186,113,71,261,253,47,387,25,57,79,322,82,349,217,306,33,198,196,306,240,271,129,284,6,349,370,59,350,275,385,137,394,329,175,58,151,223,81,233,2,370,369,135,257,391,92,260,55,321,153,328,260,312,102,79,192]);
maxAlternatingSum([6,2,1,2,4,5]);
maxAlternatingSum([5,6,7,8]);
maxAlternatingSum([374,126,84,237]);
