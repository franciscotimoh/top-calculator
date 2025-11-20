function add(a, b) {
    return (a + b).toString(); 
}

function subtract(a, b) {
    return (a - b).toString(); 
}

function multiply(a, b) {
    return (a * b).toString(); 
}

function divide(a, b) {
    return (a / b).toString();
}

function operate(operand1, operator, operand2) {
    const num1 = Number(operand1); 
    const num2 = Number(operand2); 
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
    }
}

calculator = {
    phase: 'start',
    firstOperand: null,
    secondOperand: null,
    operator: null,
    displayValue: '0',
}

function updateDisplayValue() {
    const calculatorDisplay = document.querySelector('.calculator-display');
    calculatorDisplay.textContent = calculator.displayValue;
}

function resetCalculatorState() {
    calculator.phase = 'start';
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.operator = null;
    calculator.displayValue = '0';
}

function handleStart(type, value) {
    if (type === "digit" && value !== "0") {
        calculator.firstOperand = value;
        calculator.displayValue = value;
        calculator.phase = 'firstEntry';
        updateDisplayValue();
    } else if (type === "clear") {
        resetCalculatorState();
        updateDisplayValue();
    }
}

function handleFirstEntry(type, value) {
    if (type === "digit") {
        calculator.firstOperand += value;
        calculator.displayValue += value;
        updateDisplayValue();
    } else if (type === "operator") {
        calculator.operator = value;
        calculator.phase = 'opSelected';
        // depress operator
    } else if (type === "clear") {
        resetCalculatorState();
        updateDisplayValue();
    }
}

function handleOpSelected(type, value) {
    if (type === "digit") {
        calculator.secondOperand = value;
        calculator.displayValue = value;
        calculator.phase = 'secondEntry';
        updateDisplayValue();
    } else if (type === 'operator') {
        calculator.operator = value;
        // un-depress old operator
        // depress new operator
    } else if (type === "clear") {
        resetCalculatorState();
        updateDisplayValue();
    }
}

function handleSecondEntry(type, value) {
    if (type === "digit") {
        if (calculator.secondOperand === "0") {
            calculator.secondOperand = value;
            calculator.displayValue = value; 
        } else {
            calculator.secondOperand += value;
            calculator.displayValue += value;
        }

        updateDisplayValue();
    } else if (type === 'operator') {
        if (calculator.operator === "/" && calculator.secondOperand === "0") {
            alert("ERROR: division by zero; Resetting calculator...");
            resetCalculatorState();
            updateDisplayValue();
        } else {
            const result = operate(calculator.firstOperand, calculator.operator, calculator.secondOperand);
            calculator.firstOperand = result;
            calculator.secondOperand = null;
            calculator.operator = value; 
            calculator.displayValue = result;
            calculator.phase = 'opSelected';
            updateDisplayValue(); 
        }
    } else if (type === 'equals') {
        if (calculator.operator === "/" && calculator.secondOperand === "0") {
            alert("ERROR: division by zero; Resetting calculator...");
            resetCalculatorState();
            updateDisplayValue();
        } else {
            const result = operate(calculator.firstOperand, calculator.operator, calculator.secondOperand);
            calculator.firstOperand = result;
            calculator.secondOperand = null;
            calculator.operator = null; 
            calculator.displayValue = result;
            calculator.phase = 'result';
            updateDisplayValue(); 
        }
    } else {
        resetCalculatorState();
        updateDisplayValue(); 
    }
}

function handleResult(type, value) {
    if (type === "digit") {
        resetCalculatorState();
        calculator.firstOperand = value;
        calculator.displayValue = value;
        calculator.phase = 'firstEntry';
        updateDisplayValue();
    } else if (type === "operator") {
        calculator.firstOperand = calculator.displayValue;
        calculator.secondOperand = null;
        calculator.operator = value;
        calculator.phase = 'opSelected'; 
    } else if (type === "clear") {
        resetCalculatorState();
        updateDisplayValue();
    }
}

function handleButtonClick(type, value) {
    switch (calculator.phase) {
        case 'start':
            handleStart(type, value);
            break;
        case 'firstEntry':
            handleFirstEntry(type, value);
            break;
        case 'opSelected':
            handleOpSelected(type, value); 
            break;
        case 'secondEntry':
            handleSecondEntry(type, value); 
            break;
        case 'result':
            handleResult(type, value); 
            break;
    }
}

// Implement button press handlers
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    const type = button.className;
    const value = button.textContent;
    button.addEventListener("click", () => {
        handleButtonClick(type, value); 
    });
})

// Implement error handling


