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
  const resetGame = () => {
    currPlayer = playerOne;
    turn = 1;
  };
  const getCurrPlayer = () => currPlayer;
  const getTurn = () => turn;
  return { changeTurn, getCurrPlayer, getTurn, resetGame };
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
    return checkWin(position, symbol);
  };
  const resetBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board[i] = null;
    }
  };
  return { updateGameBoard, resetBoard, board };
})();

const displayController = ((document) => {
  const displayResult = (result) => {
    const resultDiv = document.querySelector('.result');
    if (result) {
      resultDiv.innerText = `${game.getCurrPlayer().getName()} Wins!`;
    } else {
      resultDiv.innerText = 'Tie Game!';
    }
  };
  const disableSquareClick = () => {
    [...document.querySelectorAll('.square')].forEach((square) => {
      square.setAttribute('data-filled', true);
    });
  };
  function squareClick(e) {
    if (!this.getAttribute('data-filled')) {
      const position = this.getAttribute('data-index');
      const symbol = game.getCurrPlayer().getSymbol();
      const result = gameBoard.updateGameBoard(position, symbol);
      this.innerText = symbol;
      this.setAttribute('data-filled', true);
      if (result || (!result && game.getTurn() > 8)) {
        displayResult(result);
        disableSquareClick();
      } else {
        game.changeTurn();
      }
    }
  }
  function resetGameBoard(e) {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerText = '';
    [...document.querySelectorAll('.square')].forEach((square) => {
      square.removeAttribute('data-filled');
      square.innerText = '';
    });
    game.resetGame();
    gameBoard.resetBoard();
  }
  const initializeGameBoard = (() => {
    // inject 9 divs into game board grid
    const boardDisplay = document.querySelector('.game-board');
    let square = null;
    for (let i = 0; i < 9; i += 1) {
      square = document.createElement('div');
      square.setAttribute('class', 'square');
      square.setAttribute('data-index', i);
      square.addEventListener('click', squareClick);
      boardDisplay.appendChild(square);
    }
    const resetBtn = document.querySelector('.reset');
    resetBtn.addEventListener('click', resetGameBoard);
  })();
})(document);
