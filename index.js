const gameBoard = (() => {
  const board = new Array(9);
  const checkWin = (position, symbol) => {
    let diagWin = false;
    let colWin = true;
    let rowWin = true;
    // diagonal win is impossible without the center square
    const centerSquare = board[4];
    if (centerSquare === symbol && position % 2 === 0) {
      diagWin =
        (board[0] === board[8] && board[0] === symbol) ||
        (board[2] === board[6] && board[2] === symbol);
    }
    // colStart is the index of the element in the first row of a col
    let colStart = position % 3;
    while (colStart < 9) {
      if (board[colStart] !== symbol) colWin = false;
      colStart += 3;
    }
    // rowStart is the index of the element in the first col of a row
    const rowStart = position - (position % 3);
    console.log(rowStart);
    let j = 0;
    while (j < 3) {
      if (board[rowStart + j] !== symbol) rowWin = false;
      j += 1;
    }
    return colWin || rowWin || diagWin;
  };
  const updateGameBoard = (position, symbol) => {
    board[position] = symbol;
    if (checkWin(position, symbol)) {
      console.log('win');
    } else {
      console.log('play on');
    }
  };
  return { updateGameBoard };
})();

const displayController = (() => {
  console.log('hello');
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};
