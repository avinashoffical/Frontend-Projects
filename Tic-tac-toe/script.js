let chooseSymbol = document.querySelector(".choose-symbol");
let chose_O = document.querySelector(".chose-o");
let chose_X = document.querySelector(".chose-x");
let showChoice = document.querySelector(".show-choice");
let gameContainer = document.querySelector(".container");
let boxes = document.querySelectorAll(".box");
let resultContainer = document.querySelector(".result-container");
let resultMsg = document.querySelector(".result-msg");
let bottomBtns = document.querySelector(".resnew-btn-container");
let resetGameBtn = document.querySelector(".resetgame-btn");
let newGameBtn = document.querySelector(".newgame-btn");
let scoreP1 = document.querySelector(".score-p1");
let scoreP2 = document.querySelector(".score-p2");

// Sound effect
let clickSound = new Audio("Sounds/click.wav");
let winSound = new Audio("Sounds/winning.wav");
let drawSound = new Audio("Sounds/draw.wav");

// Adjust volume if needed
clickSound.volume = 0.5;
winSound.volume = 0.7;
drawSound.volume = 0.6;

// Ensure audio is loaded immediately
clickSound.load();
winSound.load();
drawSound.load();

// Utility to play sounds instantly (clone prevents overlap delay)
const playSound = (sound) => {
  const s = sound.cloneNode();
  s.play();
};

let turn = true;
let counter = 0;
let player1 = "";
let player2 = "";
let P1 = 0;
let P2 = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Select choice
chose_O.addEventListener("click", () => {
  playSound(clickSound);
  player1 = "O";
  player2 = "X";
  startGame();
});

chose_X.addEventListener("click", () => {
  playSound(clickSound);
  player1 = "X";
  player2 = "O";
  startGame();
});

// Start Game
const startGame = () => {
  setSymbol(player1, player2);
  chooseSymbol.classList.add("hide");
  showChoice.classList.remove("hide");
  gameContainer.classList.remove("hide");
  bottomBtns.classList.remove("hide");
};

const setSymbol = (player1, player2) => {
  document.querySelector(".player1-choice").innerText = player1;
  document.querySelector(".player2-choice").innerText = player2;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    playSound(clickSound);
    const currentSymbol = turn ? player1 : player2;
    box.innerText = currentSymbol;
    box.classList.add(currentSymbol === "X" ? "colour-x" : "colour-o");
    box.disabled = true;
    counter++;
    checkWinner();
    turn = !turn;
  });
});

const checkWinner = () => {
  for (let pattern of winPattern) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }

  if (counter === 9) {
    drawGame();
  }
};

const showWinner = (winner) => {
  playSound(winSound);
  let win = player1 === winner ? "Player 1" : "Player 2";
  result();
  resultMsg.innerText = `Congratulations!!\n${win} wins`;
  updateScore(win);
};

const result = () => {
  gameContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  bottomBtns.classList.add("resnew-btn-container-1");
  resetGameBtn.classList.remove("hide");
};

const updateScore = (winner) => {
  if (winner === "Player 1") {
    P1++;
    scoreP1.innerText = P1;
  } else {
    P2++;
    scoreP2.innerText = P2;
  }
};

const drawGame = () => {
  playSound(drawSound);
  result();
  resultMsg.innerText = "It's a Draw!\nPlay again!";
};

const resetGame = () => {
  turn = true;
  counter = 0;
  enableBoxes();
  resultContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  showChoice.classList.remove("hide");
  bottomBtns.classList.remove("resnew-btn-container-1");
};

const newGame = () => {
  location.reload();
};

newGameBtn.addEventListener("click", newGame);
resetGameBtn.addEventListener("click", resetGame);

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("colour-x", "colour-o");
  });
};
