const boxes = document.querySelectorAll(".box");
const winnerModal = document.querySelector("#showWinner");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#restart");
const gameContainer = document.querySelector(".game-container");
const msg = document.querySelector("#msg");

let board = ["", "", "", "", "", "", "", "", ""];
let turnCounts = 0;
// game win pattrens
const pattrens = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerHTML = "x";
    box.style.pointerEvents = "none";
    turnCounts++;
    let isWinner = checkForWin();
    if (!isWinner) {
      computerTurn();
      checkForWin();
    }
    if (turnCounts === 9 && !isWinner) drawGame();
  });
});

//  change turn
function computerTurn() {
  let emptyBoxes = [];
  boxes.forEach((box) => {
    if (box.innerHTML == "") {
      emptyBoxes.push(box);
    }
  });
  if (emptyBoxes.length === 0) return;
  let ComputerWinningPattren = findComputerWinningPattren();
  let UserWinningPattren = findUserWinningPattren();
  if(ComputerWinningPattren){
     let pattrenWinningElem = ComputerWinningPattren.find(index => 
    boxes[index].innerHTML === ""
    );
    winningElem = boxes[pattrenWinningElem];
    if (winningElem.innerHTML !== "") return 
      winningElem.style.pointerEvents = "none";
      winningElem.innerHTML = "o";
      turnCounts++;
  }
  if (UserWinningPattren ) {
    let pattrenWinningElem = UserWinningPattren.find(index => 
    boxes[index].innerHTML === ""
    );
    winningElem = boxes[pattrenWinningElem];
    if (winningElem.innerHTML !== "") return 
      winningElem.style.pointerEvents = "none";
      winningElem.innerHTML = "o";
      turnCounts++;
    
  }
  
  else {
    let selectedElement =
      emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    selectedElement.style.pointerEvents = "none";
    selectedElement.innerHTML = "o";
    turnCounts++;
  }
}

// win check
function checkForWin() {
  for (const pattren of pattrens) {
    let position1 = boxes[pattren[0]].innerHTML;
    let position2 = boxes[pattren[1]].innerHTML;
    let position3 = boxes[pattren[2]].innerHTML;

    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (
        position1 == position2 &&
        position2 == position3 &&
        position3 == position1
      ) {
        showWinner(position1);
        return true;
      }
    }
  }
  return false;
}

// show winner
function showWinner(winner) {
  winnerModal.style.display = "block";
  gameContainer.style.display = "none";
  document.querySelector(".winnerLabel").innerHTML = winner;
}

// New Game
function newGame() {
  msg.innerHTML = `The winner is <strong class='winnerLabel'></strong>`;
  turn = "x";
  turnCounts = 0;
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.pointerEvents = "auto";
  });
  winnerModal.style.display = "none";
  gameContainer.style.display = "grid";
}
newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", newGame);

// drawGame
function drawGame() {
  winnerModal.style.display = "block";
  gameContainer.style.display = "none";
  msg.innerHTML = "draw";
}

function findUserWinningPattren() {
  for (const pattren of pattrens) {
    let p1 = boxes[pattren[0]].innerHTML;
    let p2 = boxes[pattren[1]].innerHTML;
    let p3 = boxes[pattren[2]].innerHTML;
    if (p1 == "x" && p2 == "x"  && p3 !="o") {
      return pattren;
    }
    if (p1 == "x" && p2 !== "o"  && p3 =="x") {
      return pattren;
    }
    if (p1 !== "o" && p2 == "x"  && p3 =="x") {
      return pattren;
    }
   
  }
  return false;
}
function findComputerWinningPattren() {

  for (const pattren of pattrens) {
    let p1 = boxes[pattren[0]].innerHTML;
    let p2 = boxes[pattren[1]].innerHTML;
    let p3 = boxes[pattren[2]].innerHTML;
    if (p1 == "o" && p2 == "o"  && p3 !="x") {
       
       return pattren;
    }
    if (p1 == "o" && p2 !== "x"  && p3 =="o") {
      
       return pattren;
    }
    if (p1 !== "x" && p2 == "o"  && p3 =="o") {
    
        return pattren;
    }
   
  }
  return false;
}
