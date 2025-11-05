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
const open_parenthese = document.querySelector('.open_parenthese');
const close_parenthese = document.querySelector('.close_parenthese');

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

// Function to check for the equal parentese.
function check_parenthese(str) {
    let stack = [];
    for(let ch of str){
        if (ch == '(') stack.push(ch);
        else if (ch == ')') {
            if (stack.length == 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}

// To add the parenthese if user wants to enter.
open_parenthese.addEventListener('click', (e) => {
    if (display.textContent == '0') 
        display.textContent = '(';
    else 
        display.textContent += '(';
    
    previous_inputs += '(';
})

// Note : here we are not adding the if else because if there is a opening parenthese is available then only the closing one will be added.
close_parenthese.addEventListener('click', (e) => {
    // add ')' only if the '(' is unmatched.
    let opens = (previous_inputs.match(/\(/g) || []).length;
    let close = (previous_inputs.match(/\)/g) || []).length;
    if (opens > close && !isOperator(previous_inputs.at(-1))){
        display.textContent += ')';
        previous_inputs += ')';
    }
})

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
    try {
        let final_result = eval(previous_inputs); // built-in evaluator handles ()
        display.textContent = final_result;
        previous_inputs = String(final_result);
    } catch (error) {
        display.textContent = "Error";
    }
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