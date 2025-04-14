const targetEl = document.getElementById("targetNumber");
const submitBtn = document.getElementById("submitBtn");
const scoreEl = document.getElementById("score");
const expressionEl = document.getElementById("expression");
const numberButtonsEl = document.getElementById("numberButtons");
const operatorsButtonsEl = document.getElementById("operatorButtons");
const currentValueResultEl = document.getElementById("currentValueResult");
const messageEl = document.getElementById("message");
const timeEl = document.getElementById("time");

let currentNums = "";
let currentExpressionArray = [];
let evaluatedResult = 0;
let targetNum = undefined;
let currentScore = 0;
const disabledNumbers = [];
const maxTimeAllowed = 15;
let timeLeft = maxTimeAllowed;
let currentInterval;

function tryStartCountdown() {
  if (currentInterval) return;
  timeLeft = maxTimeAllowed;
  timeEl.innerText = timeLeft;
  currentInterval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 5) {
      timeEl.innerHTML = `<span style="color: red">${timeLeft}</span>`;
      if (timeLeft < 1) {
        gameOver();
      }
    } else {
      timeEl.innerText = timeLeft;
    }
  }, 1000);
}

function stopCountdown() {
  if (currentInterval) {
    clearInterval(currentInterval);
  }
}

function disableOperatorButtons(bool) {
  for (const btn of operatorsButtonsEl.children) {
    btn.disabled = bool;
  }
}

function gameOver() {
  stopCountdown();
  setTimeout(() => {
    alert("gameover");
  }, 1000);
}

function calculateResult() {
  //display expression
  expressionEl.innerText = `${currentExpressionArray.join(" ")} ${currentNums}`;

  //calculate result
  if (currentNums.length > 0) {
    evaluatedResult = eval(currentExpressionArray.join(" ") + Number(currentNums));
    currentValueResultEl.innerText = evaluatedResult;
  }

  submitBtn.disabled = currentExpressionArray.length === 0 || currentNums.length === 0;
}

function submitResult() {
  if (targetNum === evaluatedResult) {
    alert("corrent");
    currentScore += 2;
  } else {
    alert("not correct");
    currentScore -= 1;
  }
  resetButtons();
  scoreEl.innerText = currentScore;
}

//initialize numbers
for (let i = 0; i < 10; i++) {
  numberButtonsEl.insertAdjacentHTML("beforeend", `<button value="${i}">${i}</button>`);
  //on bu
  numberButtonsEl.children[i].addEventListener("click", onNumberButtonClicked);
}

function onNumberButtonClicked(event) {
  const num = event.target.value;
  currentNums += num;
  disabledNumbers.push(event.target);
  event.target.disabled = true;
  calculateResult();
  disableOperatorButtons(false);
  tryStartCountdown();
}

//on expression button clicked
for (const btn of operatorsButtonsEl.children) {
  btn.addEventListener("click", (event) => {
    if (currentNums.length > 0) {
      currentExpressionArray.push(Number(currentNums), event.target.value);
      currentNums = "";
      calculateResult();
      disableOperatorButtons(true);
      clearDisabledNumberButtons();
    } else {
      calculateResult();
    }
  });
}

//submit button clicked
submitBtn.addEventListener("click", () => {
  submitResult();
});

function resetButtons() {
  targetNum = Math.floor(Math.random() * 101);
  targetEl.innerText = targetNum;

  currentValueResultEl.innerText = "";
  expressionEl.innerText = "";
  currentNums = "";
  currentExpressionArray.length = 0;

  disableOperatorButtons(true);
  clearDisabledNumberButtons();
}

function clearDisabledNumberButtons() {
  //clear disabled buttons
  disabledNumbers.forEach((btn) => (btn.disabled = false));
  disabledNumbers.length = 0;
}

//game restart logic
function restartGame() {
  resetButtons();
  scoreEl.innerText = currentScore;
}

restartGame();
