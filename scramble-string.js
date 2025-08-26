/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    return scrambleString(s1, s2).has(s2);
};

const scrambleString = (str, target, memo = {}) => {
  const n = str.length;

  if (memo[str]) {
    return memo[str];
  }

  if (n === 1) {
    return new Set([str]);
  }

  const res = new Set();
  for (let i = 1; i < n; i++) {
    const left = scrambleString(str.substring(0, i), target, memo);
    const right = scrambleString(str.substring(i, n), target, memo);
    memo[str.substring(0, i)] = left;
    memo[str.substring(i, n)] = right;

    for (let l of left) {
      if (target.includes(l)) {
        for (let r of right) {
          if (target.includes(l + r)) {
            res.add(l + r);
          }
          if (target.includes(r + l)) {
            res.add(r + l);
          }
        }
      }
    }
  }
  return res;
}

const res = scrambleString(process.argv[2], process.argv[3]);

console.log(res);