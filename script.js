const boxes=document.querySelectorAll(".box");
const winnerModal=document.querySelector("#showWinner")
const resetBtn=document.querySelector("#reset")
const newGameBtn=document.querySelector("#restart")
const gameContainer=document.querySelector(".game-container")

let turnCounts= 0;
// game win pattrens
const pattrens =[
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ]
let turn ='x'
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        box.innerHTML=turn
        box.style.pointerEvents='none'
        turnCounts++
        let isWinner=checkForWin();
        if (!isWinner) {
            changeTurn()
        }
        if(turnCounts === 9 && !isWinner) drawGame()
        
        
    })

})

//  change turn 
function changeTurn(){
    if(turn === 'x') turn ='o'
    else turn = 'x'
}

// win check
function checkForWin(){
    for (const pattren of pattrens) {
        let position1=boxes[pattren[0]].innerHTML;
        let position2=boxes[pattren[1]].innerHTML;
        let position3=boxes[pattren[2]].innerHTML;

        if (position1 !== '' && position2 !== '' && position3 !== '') {
            if (position1 ===  position2 && position2 === position3 && position3 === position1) {
                showWinner(position1)
                return true;
            }
        }

    }
}

// show winner
function showWinner(winner){
winnerModal.style.display='block'
gameContainer.style.display='none'
document.querySelector('.winnerLabel').innerHTML=winner
}

// New Game
function  newGame() {
    turn ='x'
    turnCounts=0
    boxes.forEach((box)=>{
        box.innerHTML=''
        box.style.pointerEvents='auto'
    })
    winnerModal.style.display='none'
    gameContainer.style.display='grid'
    document.querySelector('.winnerLabel').closest('p').innerHTML=`The winner is <strong class="winnerLabel">X</strong>`
}
newGameBtn.addEventListener('click',newGame)
resetBtn.addEventListener('click',newGame)


// drawGame
function drawGame(){
    winnerModal.style.display='block'
gameContainer.style.display='none'
document.querySelector('.winnerLabel').closest('p').innerHTML='The game ended in a draw'
}