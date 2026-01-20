const result = document.getElementById("result");
let currentInput = "";
let operator = "";
let previousInput = "";

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      operator = "";
      previousInput = "";
      result.value = "";
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      result.value = currentInput;
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput) {
        if (previousInput && operator) {
          calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else if (value === "=") {
      if (previousInput && currentInput && operator) {
        calculate();
        operator = "";
      }
    } else {
      currentInput += value;
      result.value = currentInput;
    }
  });
});

function calculate() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  let res;

  switch (operator) {
    case "+":
      res = prev + curr;
      break;
    case "-":
      res = prev - curr;
      break;
    case "*":
      res = prev * curr;
      break;
    case "/":
      res = prev / curr;
      break;
    default:
      return;
  }

  result.value = res;
  currentInput = res.toString();
  previousInput = "";
}
