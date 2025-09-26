let choices = document.querySelectorAll(".choice");
let userScore = document.querySelector(".user-score");
let compScore = document.querySelector(".comp-score");
let resultMsg = document.querySelector(".result");

let scoreUser = 0;
let scoreComp = 0;

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const compChoiceGeneration = () => {
  let option = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * 3);
  return option[random];
};

const playGame = (userChoice) => {
  const compChoice = compChoiceGeneration();

  if (userChoice === compChoice) {
    drawGame(userChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const drawGame = (userChoice) => {
  resultMsg.innerText = `Game Draw. Both chose ${userChoice}.`;
  resultMsg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    scoreUser++;
    userScore.innerText = scoreUser;
    resultMsg.innerText = `You Won! ${userChoice} beats ${compChoice}`;
    resultMsg.style.backgroundColor = "green";
  } else {
    scoreComp++;
    compScore.innerText = scoreComp;
    resultMsg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
    resultMsg.style.backgroundColor = "red";
  }
};
