const boxes = document.querySelectorAll(".box");
const winnerModal = document.querySelector("#showWinner");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#restart");
const gameContainer = document.querySelector(".game-container");

let board = ["", "", "", "", "", "", "", "", ""];
let turnCounts = 0;
let isComputerThinking = false;

const pattrens = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

// ========================
// PLAYER CLICK
// ========================
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {

    if (board[index] !== "" || isComputerThinking) return;

    makeMove(index, "x");

    if (checkForWin()) return;

    if (turnCounts === 9) {
      drawGame();
      return;
    }

    isComputerThinking = true;

    setTimeout(() => {
      computerTurn();

      if (checkForWin()) {
        isComputerThinking = false;
        return;
      }

      if (turnCounts === 9) {
        drawGame();
      }

      isComputerThinking = false;

    }, 500);
  });
});

// ========================
// COMMON MOVE FUNCTION
// ========================
function makeMove(index, player) {
  board[index] = player;
  boxes[index].innerHTML = player;
  boxes[index].style.pointerEvents = "none";
  turnCounts++;
}

// ========================
// COMPUTER TURN (LEVEL 2 AI)
// ========================
function computerTurn() {

  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < 9; i++) {

    if (board[i] === "") {

      board[i] = "o";

      let score = minimax(board, false);

      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  makeMove(bestMove, "o");
}
// ========================
// FIND WINNING MOVE
// ========================
function findWinningMove(player) {

  for (let pattern of pattrens) {
    let [a,b,c] = pattern;

    let values = [board[a], board[b], board[c]];

    let playerCount = values.filter(v => v === player).length;
    let emptyCount = values.filter(v => v === "").length;

    if (playerCount === 2 && emptyCount === 1) {
      return pattern[values.indexOf("")];
    }
  }

  return null;
}

// ========================
// WIN CHECK
// ========================
function checkForWin() {

  for (let pattern of pattrens) {
    let [a,b,c] = pattern;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      setTimeout(() => {
        showWinner(board[a]);
      }, 500);

      return true;
    }
  }

  return false;
}

// ========================
// SHOW WINNER
// ========================
function showWinner(winner) {
  winnerModal.style.display = "block";
  gameContainer.style.display = "none";
  document.querySelector(".winnerLabel").innerHTML = winner;
}

// ========================
// DRAW
// ========================
function drawGame() {
  winnerModal.style.display = "block";
  gameContainer.style.display = "none";
  document.querySelector(".winnerLabel").innerHTML = "Draw";
}

// ========================
// RESET GAME
// ========================
function newGame() {

  board = ["", "", "", "", "", "", "", "", ""];
  turnCounts = 0;
  isComputerThinking = false;

  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.pointerEvents = "auto";
  });

  winnerModal.style.display = "none";
  gameContainer.style.display = "grid";
}

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", newGame);
// MinMax logic
function checkWinner(currentBoard){
        for (const pattern of pattrens) {
            let [a,b,c] =pattern
            if(currentBoard[a] !=="" &&  currentBoard[a] === currentBoard[b] &&  currentBoard[b] === currentBoard[c]){
                 return currentBoard[a]; 
            }
        }
          return null;
}
// Main function
function minimax(currentBoard, isMaximizing) {
  
  let winner = checkWinner(currentBoard);

  if (winner === "o") return 1;
  if (winner === "x") return -1;
  if (!currentBoard.includes("")) return 0;
 if (isMaximizing) {

  let bestScore = -Infinity;

  for (let i = 0; i < 9; i++) {

    if (currentBoard[i] === "") {

      currentBoard[i] = "o";

      let score = minimax(currentBoard, false);

      currentBoard[i] = "";

      bestScore = Math.max(score, bestScore);
    }
  }

  return bestScore;
}else {

  let bestScore = Infinity;

  for (let i = 0; i < 9; i++) {

    if (currentBoard[i] === "") {

      currentBoard[i] = "x";

      let score = minimax(currentBoard, true);

      currentBoard[i] = "";

      bestScore = Math.min(score, bestScore);
    }
  }

  return bestScore;
}
}