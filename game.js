const boardContainer = document.querySelector("#board");
const winnerDisplay = document.querySelector("#winner-display");
const resetBtn = document.querySelector("#restart");
const p1Name = document.querySelector("#player1-name");
const p2Name = document.querySelector("#player2-name");

const GameBoard = (() => {
    const cells = [];
    const buildBoard = () => {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement("div");
            div.className = "cell"
            boardContainer.appendChild(div)
            cells.push(div);
        }
    }

    return { cells, buildBoard };
})()

const Player = (name, sign) => {
    return { name, sign };
}

const Game = (p1, p2) => {
    GameBoard.buildBoard();
    const player1 = Player("Enzo", "X");
    const player2 = Player("Brayan", "O");
    let currentPlayer = player1;
    let gameFinished = false;
    let winner = "Nobody";
    winCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

    GameBoard.cells.forEach(cell => {
        cell.addEventListener("click", () => {
            resetWinnerDisplay();
            if (cell.textContent !== "") return;
            cell.textContent = currentPlayer.sign;
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            checkWin(GameBoard.cells)
            if (gameFinished) {
                displayWinner();
                resetGame()
            }
        })
    })

    const displayWinner = () => winnerDisplay.textContent = `${winner} win the game !!!`;
    const resetWinnerDisplay = () => winnerDisplay.textContent = "";

    const checkWin = (cells) => {
        const [xCells, oCells] = [[], []];

        cells.forEach((x, i) => {
            if (x.textContent === "X") xCells.push(i);
            else if (x.textContent === "O") oCells.push(i)
        });

        winCases.forEach(e => {
            if (e.every(o => xCells.includes(o))) [winner, gameFinished] = [player1.name, true]
            else if (e.every(o => oCells.includes(o))) [winner, gameFinished] = [player2.name, true]
        })

        if (cells.every(e => e.textContent !== "")) gameFinished = true;
    }

    const resetGame = () => {
        GameBoard.cells.forEach(e => e.textContent = "");
        [currentPlayer, gameFinished, winner] = [player1, false, "Nobody"];
    }

    return {player1, player2, currentPlayer, gameFinished, winner, winCases, 
            displayWinner, resetWinnerDisplay, checkWin, resetGame}
}

const main = (() => {
    const game = Game(Player("Enzo", "X"), Player("Brayan", "O"));

    resetBtn.addEventListener("click", () => {
        game.resetGame();
        game.resetWinnerDisplay();
    })
})()