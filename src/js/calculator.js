

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");


let currentInput = "";
let previousInput = "";
let operator = "";


function updateDisplay(value) {
  display.value = value;
}


buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (isNaN(value)) { 
      if (value === "+" || value === "-" || value === "*" || value === "/") {
        if (currentInput !== "") {
          if (previousInput !== "") {
            currentInput = calculate(previousInput, currentInput, operator);
          }
          operator = value;
          previousInput = currentInput;
          currentInput = "";
        }
      }
    } else {
      currentInput += value; 
    }

    updateDisplay(previousInput + operator + currentInput);
  });
});


equalsButton.addEventListener("click", () => {
  if (currentInput !== "" && previousInput !== "" && operator !== "") {
    currentInput = calculate(previousInput, currentInput, operator);
    operator = "";
    previousInput = "";
    updateDisplay(currentInput);
  }
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("");
});


function calculate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return (num1 + num2).toString();
    case "-":
      return (num1 - num2).toString();
    case "*":
      return (num1 * num2).toString();
    case "/":
      return num2 !== 0 ? (num1 / num2).toString() : "Error";
    default:
      return "";
  }
}


updateDisplay("");
