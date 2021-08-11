const keypad = document.querySelector(".keypad");
const output = document.querySelector(".output");
let equation;
let currentOperator;
let operand1;

function addEventListeners() {
  let allNumbers = document.querySelectorAll(".number");
  allNumbers.forEach((num) => num.addEventListener("click", inputNumber));
  let allOperators = document.querySelectorAll(".operator");
  allOperators.forEach((op) => op.addEventListener("click", inputOperator));
  document.querySelector("#allclear").addEventListener("click", clearDisplay);
  document.querySelector("#percent").addEventListener("click", convertToPercent);
  document.querySelector("#flip-sign").addEventListener("click", flipSign);
  document.querySelector("#decimal").addEventListener("click", addDecimal);
  document.querySelector("#equal").addEventListener("click", operate);
}

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

function inputNumber() {
  if (currentOperator !== undefined) {
    if (operand1 === undefined) {
      operand1 = output.textContent;
      output.textContent = this.textContent;
    } else {
      if (output.textContent.length < 10) {
        if (hasDecimal()) {
          output.textContent = output.textContent + this.textContent;
        } else {
          output.textContent =
            Number(output.textContent * 10) + Number(this.textContent);
        }
      }
    }
  } else {
    if (output.textContent.length < 10) {
      if (hasDecimal()) {
        output.textContent = output.textContent + this.textContent;
      } else {
        output.textContent =
          Number(output.textContent * 10) + Number(this.textContent);
      }
    }
  }
}

function inputOperator() {
  if (operand1 !== undefined) {
    operate();
  }
  currentOperator = this.textContent;
}

function clearDisplay() {
  output.textContent = "0";
  currentOperator = undefined;
  operand1 = undefined;
}

function convertToPercent() {
  output.textContent /= 100;
}

function flipSign() {
  if (output.textContent > 0) {
    output.textContent = "-" + output.textContent;
  } else {
    output.textContent = Math.abs(output.textContent);
  }
}

function addDecimal() {
  if (output.textContent.length < 10 && !hasDecimal()) {
    output.textContent += ".";
  }
}

function hasDecimal() {
  return output.textContent.indexOf(".") != -1;
}

function operate() {
  // validate operator and a, b first
  if (operand1 !== undefined && currentOperator !== undefined) {
    if (currentOperator == "+") {
      output.textContent = add(operand1, output.textContent);
    } else if (currentOperator == "−") {
      output.textContent = subtract(operand1, output.textContent);
    } else if (currentOperator == "×") {
      output.textContent = multiply(operand1, output.textContent);
    } else if (currentOperator == "÷") {
      output.textContent = divide(operand1, output.textContent);
    }
    operand1 = undefined;
    currentOperator = undefined;
  }
}

window.onload = () => {
  addEventListeners();
};
