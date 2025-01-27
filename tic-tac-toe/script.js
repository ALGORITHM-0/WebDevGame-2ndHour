const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const clickSound = document.getElementById('clickSound');
const turnIndicator = document.getElementById('turnIndicator');
let isXTurn = true;

clickSound.playbackRate = 2.0;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (cell.textContent === 'X' || cell.textContent === 'O') {
        clickSound.play();
    }
    if (checkWin(currentClass)) {
        alert(`${currentClass} wins!`);
    } else if (isDraw()) {
        alert('Draw!');
    } else {
        swapTurns();
        updateTurnIndicator();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function updateTurnIndicator() {
    turnIndicator.textContent = isXTurn ? "X's Turn" : "O's Turn";
}

function checkWin(currentClass) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXTurn = true;
    updateTurnIndicator();
}
