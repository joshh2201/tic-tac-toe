const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const game = (() => {
  const playerOne = Player('p1', 'X');
  const playerTwo = Player('p2', 'O');
  let turn = 1;
  let currPlayer = playerOne;

  const changeTurn = () => {
    if (currPlayer === playerOne) {
      currPlayer = playerTwo;
    } else {
      currPlayer = playerOne;
    }
    turn += 1;
  };
  const getCurrPlayer = () => currPlayer;
  const getTurn = () => turn;
  return { changeTurn, getCurrPlayer, getTurn };
})();

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
      console.log(`${game.getCurrPlayer().getName()} wins`);
    } else if (game.getTurn() > 8) {
      // game is tied if there is no winner after 8 turns
      console.log('tied');
    } else {
      console.log('play on');
    }
  };
  return { updateGameBoard, fullBoard };
})();

const displayController = ((document) => {
  function squareClick(e) {
    if (!this.innerText) {
      const position = this.getAttribute('data-index');
      const symbol = game.getCurrPlayer().getSymbol();
      gameBoard.updateGameBoard(position, symbol);
      this.innerText = symbol;
      game.changeTurn();
      // change turns here
    }
  }
  const initializeGameBoard = ((doc) => {
    // inject 9 divs into game board grid
    const boardDisplay = doc.querySelector('.game-board');
    let square = null;
    for (let i = 0; i < 9; i += 1) {
      square = doc.createElement('div');
      square.setAttribute('class', 'square');
      square.setAttribute('data-index', i);
      square.addEventListener('click', squareClick);
      boardDisplay.appendChild(square);
    }
  })(document);
})(document);
