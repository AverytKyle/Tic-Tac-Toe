const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let xScoreTally = 0;
let oScoreTally = 0;

const handleCellClick = e => {
    const cell = e.target;

    const currentWinner = checkForWin();
    if (currentWinner) {
        return;
    }

    if (cell.textContent === '' || cell.textContent !== 'O') {
        cell.textContent = 'X'
    }

    const winner = checkForWin();
    if (winner) {
        gameMessage.textContent = `${winner} wins!`;

        if(winner === 'X') {
            xScoreTally++;
        } else {
            oScoreTally++;
        }

        xScore.textContent = `X: ${xScoreTally}`;
        oScore.textContent = `O: ${oScoreTally}`;
        
        return;
    }

    setTimeout(() => {
        placeO();

        const aiWins = checkForWin();
        if (aiWins) {
            gameMessage.textContent = `${aiWins} wins!`;

            if (aiWins === 'X') {
                xScoreTally++;
            } else {
                oScoreTally++;
            }
    
            xScore.textContent = `X: ${xScoreTally}`;
            oScore.textContent = `O: ${oScoreTally}`;
        }

        if (isDraw()) {
            gameMessage.textContent = "It's a Draw!";
        }
    }, 500);
}

const handleRestartClick = e => {
    squares.forEach(square => square.textContent = '');
    gameMessage.textContent = '';
}

const squares = document.querySelectorAll('.cell');
squares.forEach(square => square.addEventListener('click', handleCellClick));
const restartButton = document.querySelector('.game-restart').addEventListener('click', handleRestartClick);
const gameMessage = document.querySelector('.game-message');
const xScore = document.querySelector('.game-score-x');
const oScore = document.querySelector('.game-score-o');

// AI logic to place 'O'
const placeO = () => {
    const blockMove = findBlockMove();
    const winningMove = findWinningMove();

    if (winningMove !== -1) {
        squares[winningMove].textContent = 'O';
        return
    }
    
    if (blockMove !== -1) {
        squares[blockMove].textContent = 'O';
        return
    }

    // If no winning or blocking move, place 'O' in a random empty cell
    const emptyCells = [];
    squares.forEach(square => {
        if (square.textContent === '') {
            emptyCells.push(square);
        }
    });

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'O';
    }
}

// AI logic to block 'X'
const findBlockMove = () => {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;

        const cellA = squares[a];
        const cellB = squares[b];
        const cellC = squares[c];

        if (cellA.textContent === 'X' && cellB.textContent === 'X' && cellC.textContent === '') {
            return c;
        } else if (cellA.textContent === 'X' && cellB.textContent === '' && cellC.textContent === 'X') {
            return b;
        } else if (cellA.textContent === '' && cellB.textContent === 'X' && cellC.textContent === 'X') {
            return a;
        }
    }
    return -1;
}

// AI logic to win
const findWinningMove = () => {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;

        const cellA = squares[a];
        const cellB = squares[b];
        const cellC = squares[c];

        if (cellA.textContent === 'O' && cellB.textContent === 'O' && cellC.textContent === '') {
            return c;
        } else if (cellA.textContent === 'O' && cellB.textContent === '' && cellC.textContent === 'O') {
            return b;
        } else if (cellA.textContent === '' && cellB.textContent === 'O' && cellC.textContent === 'O') {
            return a;
        }
    }
    return -1;
}

const checkForWin = () => {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;

        const cellA = squares[a];  
        const cellB = squares[b];
        const cellC = squares[c];

        if (cellA.textContent !== '' && cellA.textContent === cellB.textContent && cellB.textContent === cellC.textContent) {
            return cellA.textContent;
        }
    }
    return false;
}

const isDraw = () => {
    return [...squares].every(square => square.textContent !== '');
}