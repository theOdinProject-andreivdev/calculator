//populate all our controllers

const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
let numberButtons = [];
let operatorButtons = [];
let eqButton;
let clearButton;

buttons.forEach((button) => {
  if (
    button.dataset.button == "0" ||
    button.dataset.button == "1" ||
    button.dataset.button == "2" ||
    button.dataset.button == "3" ||
    button.dataset.button == "4" ||
    button.dataset.button == "5" ||
    button.dataset.button == "6" ||
    button.dataset.button == "7" ||
    button.dataset.button == "8" ||
    button.dataset.button == "9"
  ) {
    numberButtons.push(button);
  }
  if (
    button.dataset.button == "plus" ||
    button.dataset.button == "minus" ||
    button.dataset.button == "multiply" ||
    button.dataset.button == "divide"
  ) {
    operatorButtons.push(button);
  }
  if (button.dataset.button == "eq") eqButton = button;
  if (button.dataset.button == "clear") clearButton = button;
});
//--

//--pretty animations for all buttons

buttons.forEach((button) => {
  button.addEventListener("click", buttonEffect);
  button.addEventListener("transitionend", buttonRemoveEffect);
});

function buttonEffect(e) {
  this.classList.add("buttonEffect");
  console.log("total = " + total);
  console.log("currentValue = " + currentValue);
}

function buttonRemoveEffect(e) {
  this.classList.remove("buttonEffect");
}

//--

//--the real magic happens here
let currentOperation = "";
let previousOperation = "";
let firstOperation = true;
let currentValue = 0;
let total = 0;

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentValue = currentValue * 10 + parseInt(this.dataset.button);
    displayValue(currentValue);

    operatorButtons.forEach((button) => {
      button.classList.remove("buttonPressed");
    });
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    previousOperation = currentOperation;
    currentOperation = this.dataset.button;

    if (firstOperation) total = currentValue;
    if (!firstOperation)
      total = operate(previousOperation, total, currentValue);

    currentValue = 0;
    firstOperation = false;

    button.classList.add("buttonPressed");
  });
});

eqButton.addEventListener("click", function () {
  total = operate(currentOperation, total, currentValue);
  displayValue(total);
});

clearButton.addEventListener("click", function () {
  currentOperation = "";
  previousOperation = "";
  firstOperation = true;
  currentValue = 0;
  total = 0;
  displayValue(0);
});

function displayValue(val) {
  val = Math.round((val + Number.EPSILON) * 100) / 100;
  val = display.textContent = val;
}

//

//--basic computation functions
function operate(operator, a, b) {
  switch (operator) {
    case "plus":
      return plus(a, b);
      break;
    case "minus":
      return minus(a, b);
      break;
    case "multiply":
      return multiply(a, b);
      break;
    case "divide":
      return divide(a, b);
      break;
  }
}

function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) return 0;
  return a / b;
}

//--
//--
