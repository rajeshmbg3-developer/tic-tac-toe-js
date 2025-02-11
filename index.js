const board = document.getElementById("board");
const statusText = document.querySelector(".status");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Initialize board
function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    });
}

// Handle player move
function handleMove(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Restart Game
function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's Turn`;
    createBoard();
}

// Initialize the game
createBoard();