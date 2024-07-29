const elements = (function () {
  const cells = document.querySelectorAll('.cell');
  return { cells };
})();

function playerFactory(name, marker) {
  let points = 0;

  const getPoints = () => points;
  const setPoints = () => points++;
  const resetPoints = () => (points = 0);

  return { name, marker, getPoints, setPoints, resetPoints };
}

const user1 = playerFactory('player1', 'X');
const user2 = playerFactory('player2', 'O');

const Gameboard = (function () {
  let gameboard = [null, null, null, null, null, null, null, null, null];

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8],
  ];
  const players = [
    playerFactory('player1', 'X'),
    playerFactory('player2', 'O'),
  ];

  function resetGame() {
    gameboard = [null, null, null, null, null, null, null, null, null];
  }

  return { resetGame, getGameboard };
})();

const Game = (function () {
  function startGame() {
    Gameboard.resetGame();
  }
})();
