// script.js
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const modeSelect = document.getElementById('mode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let mode = 'player';

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.className = 'square';
    cell.textContent = val;
    cell.addEventListener('click', () => handleMove(i));
    boardElement.appendChild(cell);
  });
}

function handleMove(index) {
  if (!gameActive || board[index] !== '') return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusElement.textContent = (mode === 'computer' && currentPlayer === 'O')
      ? `Computer wins!` : `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusElement.textContent = `It's a Draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = (mode === 'computer')
        ? (currentPlayer === 'X' ? `Your turn` : `Computer's turn`)
        : `Player ${currentPlayer}'s turn`;
    if (mode === 'computer' && currentPlayer === 'O' && gameActive) {
      setTimeout(computerMove, 800); // A slight delay for realism
    }
  }
}

function computerMove() {
  // Simple AI: choose random empty cell
  const emptyCells = board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
  if (!emptyCells.length) return;
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  handleMove(move);
}

function checkWinner() {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

resetBtn.addEventListener('click', resetGame);
modeSelect.addEventListener('change', function() {
    mode = modeSelect.value;
    resetGame();
});

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusElement.textContent = (mode === 'computer') ? 'Your turn' : `Player X's turn`;
  gameActive = true;
  renderBoard();
}

// Initial render
resetGame();