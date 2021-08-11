const keypad = document.querySelector(".keypad");
const output = document.querySelector(".output");
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

function addKeyboardListeners() {
  document.addEventListener("keydown", (event) => {
    let key = event.key;
    switch (key) {
      case "Enter":
        operate();
        break;
      case "+":
        document.querySelector("#add").dispatchEvent(new Event("click"));
        break;
      case "-":
        document.querySelector("#subtract").dispatchEvent(new Event("click"));
        break;
      case "*":
        document.querySelector("#multiply").dispatchEvent(new Event("click"));
        break;
      case "/":
        document.querySelector("#divide").dispatchEvent(new Event("click"));
        break;
      case ".":
        document.querySelector("#decimal").dispatchEvent(new Event("click"));
        break;
      case "0":
        document.querySelector("#zero").dispatchEvent(new Event("click"));
        break;
      case "1":
        document.querySelector("#one").dispatchEvent(new Event("click"));
        break;
      case "2":
        document.querySelector("#two").dispatchEvent(new Event("click"));
        break;
      case "3":
        document.querySelector("#three").dispatchEvent(new Event("click"));
        break;
      case "4":
        document.querySelector("#four").dispatchEvent(new Event("click"));
        break;
      case "5":
        document.querySelector("#five").dispatchEvent(new Event("click"));
        break;
      case "6":
        document.querySelector("#six").dispatchEvent(new Event("click"));
        break;
      case "7":
        document.querySelector("#seven").dispatchEvent(new Event("click"));
        break;
      case "8":
        document.querySelector("#eight").dispatchEvent(new Event("click"));
        break;
      case "9":
        document.querySelector("#nine").dispatchEvent(new Event("click"));
        break;
      case "Backspace":
        document.querySelector("#allclear").dispatchEvent(new Event("click"));
        break;
    }
  });
}

function add(a, b) {
  let decimalToRound = getMaxDP(a, b);
  return (
    Math.round((Number(a) + Number(b)) * 10 ** decimalToRound) / 10 ** decimalToRound
  );
}

function subtract(a, b) {
  let decimalToRound = getMaxDP(a, b);
  return (
    Math.round((Number(a) - Number(b)) * 10 ** decimalToRound) / 10 ** decimalToRound
  );
}

function multiply(a, b) {
  // add the decimal places together
  let decimalToRound = getSumDP(a, b);
  return (
    Math.round(Number(a) * Number(b) * 10 ** decimalToRound) / 10 ** decimalToRound
  );
}

function divide(a, b) {
  let decimalToRound = getMaxDP(a, b);
  if (Number(b) == 0) {
    return "error:DIV/0";
  }
  return (
    Math.round((Number(a) / Number(b)) * 10 ** decimalToRound) / 10 ** decimalToRound
  );
}

function inputNumber() {
  if (currentOperator !== undefined) {
    if (operand1 === undefined) {
      operand1 = output.textContent;
      output.textContent = this.textContent;
    } else {
      if (output.textContent.length < 10) {
        if (hasDecimal(output.textContent)) {
          output.textContent = output.textContent + this.textContent;
        } else {
          output.textContent =
            Number(output.textContent * 10) + Number(this.textContent);
        }
      }
    }
  } else {
    if (output.textContent.length < 10) {
      if (hasDecimal(output.textContent)) {
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
  if (currentOperator !== undefined) {
    operand1 = output.textContent;
    output.textContent = "0.";
  } else if (output.textContent.length < 10 && !hasDecimal(output.textContent)) {
    output.textContent += ".";
  }
}

function hasDecimal(str) {
  return str.indexOf(".") != -1;
}

function getMaxDP(a, b) {
  // returns the max number of decimal places of a and b
  let hasA = hasDecimal(a);
  let hasB = hasDecimal(b);
  let dA = hasA ? a.length - a.indexOf(".") - 1 : 0;
  let dB = hasB ? b.length - b.indexOf(".") - 1 : 0;
  return Math.max(dA, dB);
}

function getSumDP(a, b) {
  // returns the max number of decimal places of a and b
  let hasA = hasDecimal(a);
  let hasB = hasDecimal(b);
  let dA = hasA ? a.length - a.indexOf(".") - 1 : 0;
  let dB = hasB ? b.length - b.indexOf(".") - 1 : 0;
  return dA + dB;
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
  addKeyboardListeners();
};
