/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const boards = [{ board: createBoard(n), queenCount: 0 }];
  const result = [];

  while (boards.length) {
    let { board, queenCount } = boards.pop();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === '.') {
          const newBoard = cloneBoard(board);
          newBoard[i][j] = 'x';
          boards.push({ board: newBoard, queenCount: queenCount } );
          board[i][j] = 'Q';
          queenCount++;
          erasePositions(board, i, j);
          break;
        }
      }
      if (!board[i].includes('Q')) {
        break;
      }
    }
    if (queenCount === n) {
      result.push(board.map(row => row.join('').replace(/x/g, '.')));
    }
  }
  console.log(result);
  return result;
};

const cloneBoard = (board) => {
  return board.map(row => row.slice());
};

const createBoard = (n) => {
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill('.'));
  }
  return board;
};

const erasePositions = (board, x, y) => {
  const n = board.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === '.' && (i === x || j === y || Math.abs(i - x) === Math.abs(j - y))) {
        board[i][j] = 'x';
      }
    }
  }
}

solveNQueens(+process.argv[2]);