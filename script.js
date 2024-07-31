const elements = (function () {
  const cells = document.querySelectorAll('.cell');
  const start = document.querySelector('.start');
  const players = document.querySelectorAll('.players p');
  const round = document.querySelector('.round');
  return { cells, start, players, round };
})();

function playerFactory(name, marker) {
  let score = 0;
  const scoreElement = document.querySelector(`.${name}-score`);

  const getScore = () => score;
  const resetScore = () => (score = 0);
  const setScore = () => {
    score++;
    scoreElement.textContent = score;
  };

  return { name, marker, getScore, setScore, resetScore };
}

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

  function setGameboard(index) {
    gameboard[index] = Game.getPlayer().marker;
    checkWinner();
  }

  function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (
        gameboard[a] == Game.getPlayer().marker &&
        gameboard[b] == Game.getPlayer().marker &&
        gameboard[c] == Game.getPlayer().marker
      ) {
        Game.getPlayer().setScore();
        Game.setGameInctive();
      }
    }
  }

  function resetGame() {
    gameboard = [null, null, null, null, null, null, null, null, null];
    elements.cells.forEach((cell) => {
      cell.textContent = '';
    });
  }

  return { resetGame, setGameboard };
})();

const Game = (function () {
  let round = 0;
  const players = [
    playerFactory('player1', 'X'),
    playerFactory('player2', 'O'),
  ];

  let currentPlayer = players[0];
  let isGameActive = false;

  elements.start.addEventListener('click', startGame);
  elements.round.textContent = round;

  function switchPlayer() {
    currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    if (currentPlayer == players[0]) {
      elements.players[0].classList.add('active');
      elements.players[1].classList.remove('active');
    } else {
      elements.players[0].classList.remove('active');
      elements.players[1].classList.add('active');
    }
  }

  function handleClick({ currentTarget }) {
    if (currentTarget.textContent == '' && getGameActive()) {
      currentTarget.textContent = currentPlayer.marker;
      Gameboard.setGameboard(currentTarget.dataset.cell);
      switchPlayer();
    }
  }

  const getPlayer = () => currentPlayer;
  const getGameActive = () => isGameActive;
  const setGameInctive = () => (isGameActive = false);
  const setGameActive = () => (isGameActive = true);

  const increaseRound = () => {
    round++;
    elements.round.textContent = round;
  };

  elements.cells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
  });

  function startGame() {
    increaseRound();
    elements.players[0].classList.add('active');
    elements.players[1].classList.remove('active');

    setGameActive();
    currentPlayer = players[0];
    Gameboard.resetGame();
  }

  return {
    startGame,
    getPlayer,
    setGameActive,
    setGameInctive,
    getGameActive,
  };
})();
