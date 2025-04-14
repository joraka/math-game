const targetEl = document.getElementById("targetNumber");
const submitBtn = document.getElementById("submitBtn");
const scoreEl = document.getElementById("score");
const expressionEl = document.getElementById("expression");
const numberButtonsEl = document.getElementById("numberButtons");
const operatorsButtonsEl = document.getElementById("operatorButtons");
const currentValueResultEl = document.getElementById("currentValueResult");
const messageEl = document.getElementById("message");

let currentNums = "";
let currentExpressionArray = [];
let evaluatedResult = 0;
let targetNum = undefined;
const disabledNumbers = [];

function calculateResult() {
  console.log({ currentExpressionArray, currentNums });
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
    restartGame();
  } else {
    alert("not correct");
    restartGame();
  }
}

//initialize numbers
for (let i = 0; i < 10; i++) {
  numberButtonsEl.insertAdjacentHTML("beforeend", `<button value="${i}">${i}</button>`);
  numberButtonsEl.children[i].addEventListener("click", (event) => {
    const num = event.target.value;
    currentNums += num;
    disabledNumbers.push(event.target);
    event.target.disabled = true;
    calculateResult();
  });
}

//on expression button clicked
for (const btn of operatorsButtonsEl.children) {
  btn.addEventListener("click", (event) => {
    // if(typeof currentExpressionArray.at(-1) === 'string') return;
    if (currentNums.length > 0) {
      currentExpressionArray.push(Number(currentNums), event.target.value);
      currentNums = "";
      calculateResult();
    }
  });
}

//submit button clicked
submitBtn.addEventListener("click", (event) => {
  submitResult();
});

//game restart logic
function restartGame() {
  targetNum = Math.floor(Math.random() * 101);
  targetEl.innerText = targetNum;

  //clear disabled buttons
  disabledNumbers.forEach((btn) => (btn.disabled = false));
  disabledNumbers.length = 0;

  currentValueResultEl.innerText = "";
  expressionEl.innerText = "";
  currentNums = "";
  currentExpressionArray.length = 0;
}

restartGame();
