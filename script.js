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
let result = 0;
const disabledNumbers = [];

function calculateResult() {
  console.log({ currentExpressionArray, currentNums });
  //display expression
  expressionEl.innerText = `${currentExpressionArray.join(" ")} ${currentNums}`;

  //calculate result
  if (currentNums.length > 0) {
    let result = 0;
    currentExpressionArray.forEach((v, i) => {
      if (typeof v === "string" && i < currentExpressionArray.length - 1) {
        console.log(currentExpressionArray[i - 1], currentExpressionArray[i + 1], i);
        if (v === "*") {
          result += currentExpressionArray[i - 1] * currentExpressionArray[i + 1];
        } else if (v === "-") {
          result += currentExpressionArray[i - 1] - currentExpressionArray[i + 1];
        } else if (v === "+") {
          result += currentExpressionArray[i - 1] + currentExpressionArray[i + 1];
        }
      }
    });
    currentValueResultEl.innerText = result;
    console.log({ result });
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

function startGame() {
  const targetNum = Math.floor(Math.random() * 101);
  targetEl.innerText = targetNum;
}

startGame();
