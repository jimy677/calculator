const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

let currDisplay = '';
let prevDisplay = '';
let operator = '';

display.value ='0';

const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
   '*': (a, b) => a * b,
   '/': (a, b) => {
   if (b === 0) return "Error";
        return a / b;
    }
};


function output (){
    buttons.forEach((btn) =>{
        btn.addEventListener('click', (btn) => {
        const value = btn.target.innerText
        const isOperator = btn.target.classList.contains("operator");
            if (!isNaN(value) || value === '.') { // If the button clicked is a number
                if(value === '.' && currDisplay.includes('.')){
                    return;
                }
                currDisplay += value; // Append number to current display
                display.value = currDisplay; // Update display
            } else if (value === 'AC') { // Clear all
                reset();
            }else if (value === 'C'){
                clear();
            }else if (value === '=') { // Handle equals sign
                if (prevDisplay && currDisplay && operator) {
                    // Use the unary + operator to convert to numbers
                    currDisplay = operations[operator](+prevDisplay, +currDisplay).toString();
                    display.value = currDisplay; // Update display with result
                    prevDisplay = ''; // Clear previous display
                    operator = ''; // Clear operator
                }
            } else { // If it's an operator
                if (currDisplay) {
                    if (prevDisplay) {
                        // Perform calculation if there's already a previous value
                        currDisplay = operations[operator](+prevDisplay, +currDisplay).toString();
                    }
                    prevDisplay = currDisplay; // Store current as previous
                    operator = value; // Set operator
                    currDisplay = ''; // Reset current display for the next number
                }
            }
        });
    });
}

//functions to clear the display
function reset() {
    currDisplay = '';
    prevDisplay = '';
    operator = '';
    display.value = '0';
}

function clear(){
    if(currDisplay.length > 0){
        currDisplay = currDisplay.slice(0, -1);
        display.value = currDisplay || '0';
    }
}
// Initialize output 
output();

