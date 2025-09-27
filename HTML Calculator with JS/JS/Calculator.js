const calculater = document.querySelector('.calculater');
const display = calculater.querySelector('.display');
const buttons = calculater.querySelector('.keypad');

function calculate(n1, operator, n2){
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    let result = '';

    if(operator === 'add') {
        result = num1 + num2;
    } else if(operator === 'subtract') {
        result = num1 - num2;
    } else if(operator === 'multiply') {
        result = num1 * num2;
    } else if(operator === 'divide') {
        result = num2 === 0 ? 'Error' : num1 / num2;
    }else if(operator === 'percentage') {
        result = (num1 / 100) * num2;
    }
    return result;
}

buttons.addEventListener('click', event => {

    if(event.target.matches('button')) {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        var previousKeyType = calculater.dataset.previousKeyType;
        const firstValue = calculater.dataset.firstValue;
        const operator = calculater.dataset.operator;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        if(!action) {     
            var length = display.textContent.length; 

            if(length < 14 || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                
                if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }
            }
            
            if(display.textContent.length > 9 && display.textContent.length <= 12) {
                display.style.fontSize = '2.5rem';
            } else if(display.textContent.length > 12) {
                display.style.fontSize = '2rem';
            } else {
                display.style.fontSize = '3.5em';
            }

            calculater.dataset.previousKeyType = 'number';

        }else if(action === 'decimal') {
            if(previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            } else if(!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }
            calculater.dataset.previousKeyType = 'decimal';

        }else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'|| action === 'percentage') {
            key.classList.add('is-depressed');
            if(firstValue && operator && previousKeyType !== 'operator') {
                const calcValue = calculate(firstValue, operator, displayedNum);
                display.textContent = calcValue;
                calculater.dataset.firstValue = calcValue; 
            } else {
                calculater.dataset.firstValue = displayedNum; 
            }

            calculater.dataset.operator = action;
            calculater.dataset.previousKeyType = 'operator';

        }else if(action === 'calculate') {
            const currentOperator = calculater.dataset.operator;
            const finalFirstValue = calculater.dataset.firstValue;
            const finalSecondValue = calculater.dataset.secondValue || displayedNum;
            
            if(finalFirstValue && currentOperator) {
                display.textContent = calculate(finalFirstValue, currentOperator, finalSecondValue);
            }
            
            delete calculater.dataset.firstValue;
            delete calculater.dataset.operator;
            delete calculater.dataset.secondValue;
            calculater.dataset.previousKeyType = 'calculate';
            display.style.fontSize = '3.5em';

        // --- Clear Key (AC) ---
        }else if(action === 'clear') {
            display.textContent = '0';
            delete calculater.dataset.firstValue;
            delete calculater.dataset.operator;
            delete calculater.dataset.secondValue;
            delete calculater.dataset.previousKeyType;
            display.style.fontSize = '3.5em';
        }
    }
});