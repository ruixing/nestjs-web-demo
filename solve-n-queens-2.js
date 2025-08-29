/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const pattern = new Array(n).fill('.').join('');
  const queens = [[]];
  const result = [];

  while (queens.length) {
    const existQ  = queens.pop();
    const x = existQ.length;
    for (let y = 0; y < n; y++) {
      if (noConflictCheck(existQ, x, y)) {
        queens.push([...existQ, [x, y]]);
      }
    }
    if (existQ.length === n) {
      result.push(existQ.map(row => pattern.replace(new RegExp(`(^\\.{${row[1]}})\\.`), '$1Q')));
    }
  }
  return result;
};

const noConflictCheck = (existQ, x, y) => {
  for (const [qx, qy] of existQ) {
    if (qx === x || qy === y || Math.abs(qx - x) === Math.abs(qy - y)) {
      return false;
    }
  }
  return true;
}


// solveNQueens(+process.argv[2]);