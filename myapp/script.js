// initializing the variable's to store the inputs for calculator.
const display = document.querySelector('.screen');
const numbers = document.querySelectorAll('.numbers, .special_number');
const add = document.querySelector('.add');
const subtract = document.querySelector('.subtract');
const multiply = document.querySelector('.multiply');
const division = document.querySelector('.division');
const result = document.querySelector('.equal_to');
const backspace = document.querySelector('.backspace');
const clear = document.querySelector('.clear');

// Consider a variable to store the value of the user
let value = '';
let operator = '';
let previous_inputs = '';

// function to updae screen with new value user choose.
function updateScreen (value){
    display.textContent += value;
}

// To get the value from the user.
numbers.forEach(btn => {
    btn.addEventListener('click', e => {
        value = e.target.textContent;
        
        if (display.textContent == "0"){
            display.textContent = value;
            previous_inputs += value;
        }
        else {
            updateScreen(value)
            previous_inputs += value;
        }
    });
});

// function for the operator check.
function isOperator(value){
    return ['+', '-', '*', '/'].includes(value);
}

// To input the operator.
add.addEventListener('click', e => {
    operator = e.target.textContent;
    if((isOperator(operator) && isOperator(previous_inputs[previous_inputs.length - 1])) || display.textContent == '0') return;
    updateScreen(operator);
    previous_inputs += operator;
});
subtract.addEventListener('click', e => {
    operator = e.target.textContent;
    if((isOperator(operator) && isOperator(previous_inputs[previous_inputs.length - 1])) || display.textContent == '0') return;
    updateScreen(operator);
    previous_inputs += operator;
});
multiply.addEventListener('click', e => {
    operator = e.target.textContent;
    if((isOperator(operator) && isOperator(previous_inputs[previous_inputs.length - 1])) || display.textContent == '0') return;
    updateScreen(operator);
    previous_inputs += operator;
});
division.addEventListener('click', e => {
    operator = e.target.textContent;
    if((isOperator(operator) && isOperator(previous_inputs[previous_inputs.length - 1])) || display.textContent == '0') return;
    updateScreen(operator);
    previous_inputs += operator;
});

// To display the result when user presses the equal to button.
result.addEventListener('click', () => {
    // Array to store separated numbers and operators
    let inputs_array = [];
    let num = '';

    // Split numbers and operators from previous_inputs
    for (let i = 0; i < previous_inputs.length; i++) {
        let ch = previous_inputs[i];

        if (!isOperator(ch)) {
            num += ch; // build number
        } else {
            if (num !== '') {
                inputs_array.push(Number(num));
                num = '';
            }
            inputs_array.push(ch); // push operator
        }
    }
    if (num !== '') inputs_array.push(Number(num)); // push last number

    // Simple calculation (supports +, -, *, /)
    let final_result = inputs_array[0];
    for (let i = 1; i < inputs_array.length; i += 2) {
        let op = inputs_array[i];
        let next = inputs_array[i + 1];

        if (typeof next !== 'number' || isNaN(next)) continue; // avoid NaN
        
        switch (op) {
            case '+': final_result += next; break;
            case '-': final_result -= next; break;
            case '*': final_result *= next; break;
            case '/': final_result /= next; break;
        }
    }

    display.textContent = String(final_result);
    previous_inputs = String(final_result);
});


// To remove the recent number/operator from display and from previous_inputs.
backspace.addEventListener('click', () => {
    previous_inputs = previous_inputs.slice(0, -1);
    display.textContent = previous_inputs;

    // if there are no values left to display, display 0.
    if(previous_inputs.length == 0){
        display.textContent = '0';
    }
});

// To clear the whole screen and set the default value of screen (0).
clear.addEventListener('click', () => {
    display.textContent = "0";
    value = '';
    operator = '';
    previous_inputs = '';
});