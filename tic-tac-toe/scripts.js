document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.querySelector('.restart-btn');
    let isXNext = true;
    let gameBoard = Array(9).fill(null);
    
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        return gameBoard.includes(null) ? null : 'T';
    }

    function handleClick(e) {
        const cell = e.target;
        const index = Array.from(cells).indexOf(cell);

        if (gameBoard[index] || checkWinner()) return;

        gameBoard[index] = isXNext ? 'X' : 'O';
        cell.textContent = gameBoard[index];
        isXNext = !isXNext;

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(winner === 'T' ? "It's a Tie!" : `${winner} Wins!`);
                resetGame();
            }, 100);
        }
    }

    function resetGame() {
        gameBoard.fill(null);
        cells.forEach(cell => cell.textContent = '');
        isXNext = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', resetGame);
});

