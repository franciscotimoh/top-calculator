function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operand1;
let operand2;
let operator;

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let displayText = "";

function updateDisplayText(newText) {
    const display = document.querySelector('.calculator-display'); 
    display.textContent = newText; 
}

numberClasses = {
    0: ".zero",
    1: ".one",
    2: ".two",
    3: ".three",
    4: ".four",
    5: ".five",
    6: ".six",
    7: ".seven",
    8: ".eight",
    9: ".nine"
};

for (let i = 0; i < 10; i++) {
    const numBtn = document.querySelector(numberClasses[i]);
    numBtn.addEventListener("click", () => {
        displayText += i.toString();
        updateDisplayText(displayText); 
    });
}

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    displayText = "";
    updateDisplayText(displayText); 
})