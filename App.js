const displayInput = document.querySelector('input[name="display"]');
let currentNumber = ""; // Stores the current number being entered
let previousNumber = null; // Stores the previous number for operations
let operation = null; // Stores the pending operation (+, -, *, /)

function updateDisplay(value) {
  currentNumber += value;
  displayInput.value = currentNumber;
}

function clearDisplay() {
  currentNumber = "";
  previousNumber = null;
  operation = null;
  displayInput.value = "";
}

function calculate() {
  if (previousNumber === null || operation === null) {
    return; // No operation to perform
  }
  let result;
  switch (operation) {
    case "+":
      result = parseFloat(previousNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(previousNumber) - parseFloat(currentNumber);
      break;
    case "×":
      result = parseFloat(previousNumber) * parseFloat(currentNumber);
      break;
    case "÷":
      if (currentNumber === "0") {
        displayInput.value = "Error: Division by zero";
        return;
      }
      result = parseFloat(previousNumber) / parseFloat(currentNumber);
      break;
  }
  previousNumber = result;
  currentNumber = "";
  operation = null;
  displayInput.value = result;
}

function handleOperation(op) {
  if (currentNumber === "") return; // No number entered before operator
  previousNumber = currentNumber;
  currentNumber = "";
  operation = op;
}

const buttons = document.querySelectorAll('.key input');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.value;
    if (/\d/.test(buttonValue)) { // Check if digit (0-9)
      updateDisplay(buttonValue);
    } else if (buttonValue === ".") {
      updateDisplay(buttonValue);
    } else if (buttonValue === "=") {
      calculate();
    } else if (buttonValue === "C") {
    } else { // Operator (+, -, *, /)
      handleOperation(buttonValue);
    }
  });
});
