/* eslint-disable no-param-reassign */
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
    let j = 0;
    while (j < 3) {
      if (board[rowStart + j] !== symbol) rowWin = false;
      j += 1;
    }
    return colWin || rowWin || diagWin;
  };
  const getBoard = () => board;
  function setBoard(newBoard) {
    for (let i = 0; i < board.length; i += 1) {
      board[i] = newBoard[i];
    }
  }
  const updateGameBoard = (position, symbol) => {
    board[position] = symbol;
    return checkWin(position, symbol);
  };
  const resetBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board[i] = null;
    }
  };
  const getMoves = () => {
    const moves = [];
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] !== 'X' && board[i] !== 'O') {
        moves.push(i);
      }
    }
    return moves;
  };
  return { updateGameBoard, resetBoard, getBoard, setBoard, getMoves };
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const SimpleAI = (symbol) => {
  const { getName, getSymbol } = Player('EasyAI', symbol);
  const makeMove = () => {
    const moves = gameBoard.getMoves();
    const moveIdx = Math.floor(Math.random() * moves.length);
    return moves[moveIdx];
  };
  return { getName, getSymbol, makeMove };
};

const MiniMaxAI = (symbol) => {
  const { getName, getSymbol } = Player('ImpossibleAI', symbol);
  function minimax(board, move, playerTurn) {
    const result = gameBoard.updateGameBoard(move.index, move.symbol);
    const moves = gameBoard.getMoves();
    // human player is the maximizing player
    if (result === true && playerTurn) {
      return 10;
    } else if (result === true && !playerTurn) {
      return -10;
    } else if (moves.length === 0) {
      return 0;
    }
    if (playerTurn) {
      let maxEval = -Infinity;
      moves.forEach((move) => {
        maxEval = Math.max(maxEval, minimax(board, move, false));
      });
      console.log('hi');
    } else {
      let minEval = +Infinity;
      moves.forEach((move) => {
        minEval = Math.min(minEval, minimax(board, move, false));
      });
      console.log('hi');
    }
  }
  const makeMove = () => {
    const originalBoard = [...gameBoard.getBoard()];
    // testing minimax with no depth restriction
    const moves = gameBoard.getMoves();
    gameBoard.updateGameBoard(1, symbol);
    gameBoard.setBoard(originalBoard);
  };
  return { getName, getSymbol, makeMove };
};

const game = ((window) => {
  const params = new URLSearchParams(window.location.search);
  const playerOne = Player(params.get('p1'), 'X');
  let playerTwo;
  if (params.get('p2')) {
    playerTwo = Player(params.get('p2'), 'O');
  } else {
    playerTwo = SimpleAI('O');
  }
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
})(window);

const displayController = ((document, window) => {
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
  function squareClick() {
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
        if (typeof game.getCurrPlayer().makeMove === 'function') {
          const move = game.getCurrPlayer().makeMove();
          document.querySelector(`[data-index="${move}"]`).click();
        }
      }
    }
  }
  function resetGameBoard() {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerText = '';
    [...document.querySelectorAll('.square')].forEach((square) => {
      square.removeAttribute('data-filled');
      square.innerText = '';
    });
    game.resetGame();
    gameBoard.resetBoard();
  }
  function redirectMenu() {
    window.location.href = './index.html';
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

    const menuBtn = document.querySelector('.menu');
    menuBtn.addEventListener('click', redirectMenu);
  })();
})(document, window);
