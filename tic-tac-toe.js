const board = document.getElementById('board');
const statusText = document.querySelector('.status');
let gameActive = true;
let gameBoard = ["","","","","","","","",""];
let currentPlayer = "X";
const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,7],[2,4,6] // digonal
]   

function createBorad() {
    board.innerHTML = "";
    gameBoard.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.dataset.index = index;
        cell.classList.add("cell");
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    })
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if(gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // find the winners from X and O;
    if(checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!gameBoard.includes("")) {
        statusText.textContent = `It's a Draw!`;
        gameActive = false;
        return
    }

    // who's turn it is now
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

}


function checkWinner() {
    return winningCombinations.some((combination) => {
        const [a,b,c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function restartGame() {
    gameActive = true;
    gameBoard = ["","","","","","","","",""];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    createBorad();
}

createBorad();