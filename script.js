// ELEMENTS
const toggle = document.getElementById("toggleMode");
const info = document.getElementById("info");
const information = document.getElementById("information");
const resultX = document.getElementById("resultX");
const resultO = document.getElementById("resultO");
const cell = document.querySelectorAll(".cell");
const restart = document.getElementById("restart");
const back = document.getElementById("back");
const winner = document.getElementById("winner");
const again = document.getElementById("again");
const again1 = document.getElementById("again1");
const newG = document.getElementById("newG");
const newG1 = document.getElementById("newG1");
const winnerBox = document.getElementById("winnerText");
const drawBox = document.getElementById("drawText");
const startScreen = document.getElementById("startScreen");
const playGround = document.getElementById("playGround");

const onePlayerBtn = document.getElementById("onePlayer");
const twoPlayerBtn = document.getElementById("twoPlayer");
const nameInput = document.getElementById("nameInput");
const playerXNameInput = document.getElementById("playerXName");
const playerONameInput = document.getElementById("playerOName");
const startGameBtn = document.getElementById("startGameBtn");

// VARIABLES
const winningCombo = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let boxes = ["", "", "", "", "", "", "", "", ""];
let curr = "X";
let dark = false;
let gameOver = false;
let winnerPlayer = null; 
let onePlayer = false;
let playerXName = "Player X";
let playerOName = "Player O";
let scoreX = 0;
let scoreO = 0;

// DARK MODE
toggle.addEventListener("click", () => {
  document.body.classList.toggle("darkMode");
  dark = !dark;
  toggle.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// SHOW / HIDE INFO
info.addEventListener("click", () => { information.style.display = "flex"; });
back.addEventListener("click", () => { information.style.display = "none"; });

// MODE SELECTION
onePlayerBtn.addEventListener("click", () => {
    onePlayer = true;
    playerONameInput.value = "Computer";
    playerONameInput.style.display = "none"; 
    nameInput.style.display = "flex";
});

twoPlayerBtn.addEventListener("click", () => {
    onePlayer = false;
    playerONameInput.style.display = "block"; 
    nameInput.style.display = "flex";
});

// UPDATE SCOREBOARD NAMES AND SCORES
function updateScoreboard() {
    document.querySelector('#x').textContent = `${playerXName}: ${scoreX}`;
    document.querySelector('#playerO').textContent = `${playerOName}: ${scoreO}`;
}

// START GAME WITH NAMES
startGameBtn.addEventListener("click", () => {
    playerXName = playerXNameInput.value || "Player X";
    playerOName = onePlayer ? "Computer" : (playerONameInput.value || "Player O");
    
    updateScoreboard();
    
    startScreen.style.display = "none";
    playGround.style.display = "flex";
    
    resetGame();
});

// RESET GAME FUNCTION
function resetGame() {
    boxes = ["", "", "", "", "", "", "", "", ""];
    cell.forEach(c => c.textContent = "");
    gameOver = false;
    curr = "X";
    winnerBox.style.display = "none";
    drawBox.style.display = "none";
}

// PLAYER MOVES
cell.forEach((c, index) => {
  c.addEventListener("click", () => {
    if (!gameOver && c.textContent === "" && (!onePlayer || curr === "X")) {
      makeMove(c, index);
      if (onePlayer && !gameOver && curr === "O") {
        setTimeout(computerMove, 500);
      }
    }
  });
});

function makeMove(c, index) {
  c.textContent = curr;
  boxes[index] = curr;

  if (checkWinner()) {
    winnerPlayer = curr;
    winningText();
    gameOver = true;
  } else if (boxes.every(b => b !== "")) {
    drawText();
    gameOver = true;
  } else {
    curr = curr === "X" ? "O" : "X";
  }
}

// SIMPLE COMPUTER MOVE
function computerMove() {
  if (gameOver) return;
  
  const emptyCells = [];
  boxes.forEach((val, index) => {
    if (val === "") {
      emptyCells.push(index);
    }
  });
  
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex];
    makeMove(cell[move], move);
  }
}

// CHECK WINNER
function checkWinner() {
  for (let [a, b, c] of winningCombo) {
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return true;
    }
  }
  return false;
}

// DISPLAY WINNER 
function winningText() {
  winnerBox.style.display = "flex";
  winner.textContent = `${curr === "X" ? playerXName : playerOName} Wins! 🎉`;
  again.style.display = "inline-block";
  newG.style.display = "inline-block";
  again1.style.display = "none";
  newG1.style.display = "none";
  drawBox.style.display = "none";
}

// DISPLAY DRAW 
function drawText() {
  drawBox.style.display = "flex";
  document.getElementById("draw").textContent = `It's a Draw!`;
  again1.style.display = "inline-block";
  newG1.style.display = "inline-block";
  again.style.display = "none";
  newG.style.display = "none";
  winnerBox.style.display = "none";
}

// PLAY AGAIN 
again.addEventListener("click", () => {
  if (winnerPlayer === "X") {
    scoreX++;
  } else if (winnerPlayer === "O") {
    scoreO++;
  }
  updateScoreboard();
  resetGame();
});

// NEW GAME
newG.addEventListener("click", () => {
  scoreX = 0;
  scoreO = 0;
  updateScoreboard();
  resetGame();
});

newG1.addEventListener("click", () => {
  scoreX = 0;
  scoreO = 0;
  updateScoreboard();
  resetGame();
});

again1.addEventListener("click", () => {
  resetGame();
});

// RESTART BUTTON 
restart.addEventListener("click", () => {
  resetGame();
});

// Initialize game
window.onload = function() {
    playGround.style.display = "none";
    winnerBox.style.display = "none";
    drawBox.style.display = "none";
    updateScoreboard();
};