const gameBoard = (() => {
  const board = [...Array(9)];
  const updateGameBoard = (position, symbol) => {
    board[position] = symbol;
    console.log(board);
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
