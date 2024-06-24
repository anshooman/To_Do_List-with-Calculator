let screen = document.getElementById('calculator-screen');
let equationScreen = document.getElementById('equation-screen');
let screenValue = '0';
let firstValue = 0;
let previousOperator = null;
let waitingForSecondValue = false;
let equation = '';
let sqrtActive = false;
let afterEquals = false; // Flag to track if '=' has been clicked

function inputDigit(digit) {
    if (afterEquals) {
        afterEquals = false;
        screenValue = digit;
        equation = '';
        sqrtActive = false; // Reset square root flag after equals
    } else if (waitingForSecondValue) {
        waitingForSecondValue = false;
        screenValue = digit;
    } else {
        screenValue = screenValue === '0' ? digit : screenValue + digit;
    }
    
    if (sqrtActive) {
        equation = '√(' + screenValue + ')';
    } else {
        equation += digit;
    }
    
    updateScreenDisplay();
}


function inputDecimal() {
    if (afterEquals) {
        afterEquals = false;
        inputDigit('0.');
        return;
    }
    if (waitingForSecondValue) {
        waitingForSecondValue = false;
        screenValue = '0.';
        equation = '';
    }
    if (!screenValue.includes('.')) {
        screenValue += '.';
    }
    equation += '.';
    updateScreenDisplay();
}

function toggleSign() {
    screenValue = (parseFloat(screenValue) * -1).toString();
    if (sqrtActive) {
        equation = '√(' + screenValue + ')';
    } else {
        equation = screenValue;
    }
    updateScreenDisplay();
}

function getSquareRoot() {
    if (!sqrtActive) {
        sqrtActive = true;
        equation = '√(' + screenValue + ')';
    } else {
        equation = '√(' + equation + ')';
    }
    equationScreen.textContent = equation;
    
    updateScreenDisplay();
}


function clearEntry() {
    screenValue = '0';
    equation = '';
    sqrtActive = false;
    updateScreenDisplay();
}

function clearAll() {
    firstValue = 0;
    screenValue = '0';
    previousOperator = null;
    waitingForSecondValue = false;
    equation = '';
    sqrtActive = false;
    afterEquals = false; // Reset afterEquals flag
    equationScreen.textContent = ''; // Clear equation screen
    updateScreenDisplay();
}

function handleOperator(currentOperator) {
    if (waitingForSecondValue && previousOperator !== '=') {
        previousOperator = currentOperator;
        return;
    }

    if (sqrtActive) {
        let sqrtValue = parseFloat(screenValue);
        screenValue = Math.sqrt(sqrtValue).toString();
        equation = '' + equation + '';
        sqrtActive = false;
    } else if (previousOperator) {
        firstValue = calculate(firstValue, previousOperator, parseFloat(screenValue));
        screenValue = firstValue.toString();
    } else {
        firstValue = parseFloat(screenValue);
    }

    if (currentOperator !== '=') {
        equation += ' ' + currentOperator + ' ';
    } else {
        equationScreen.textContent = equation + ' =';
        afterEquals = true; // Set flag to true after '=' is clicked
    }

    previousOperator = currentOperator;
    waitingForSecondValue = true;
    updateScreenDisplay();
}

function calculate(first, operator, second) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return second !== 0 ? first / second : 'Error';
    return second;
}

function separateScreenValueByComma() {
    let parts = screenValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function updateScreenDisplay() {
    if (sqrtActive) {
        screen.textContent = '√';
    } else {
        screen.textContent = separateScreenValueByComma();
    }
    equationScreen.textContent = afterEquals ? equation : '';
}
