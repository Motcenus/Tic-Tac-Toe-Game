const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (index) => {
    if (!gameActive || gameState[index] !== '') return;

    gameState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWin()) {
        message.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        message.innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `${currentPlayer}'s turn`;
};

const checkWin = () => {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return gameState.every(cell => cell !== '');
};

const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.innerText = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', restartGame);
