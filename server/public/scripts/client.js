console.log('Script sourced');
let displayArray = [];
let displayDiv = document.querySelector('#display');
let operatorBool = false;
let lastSolution = 0;

// Retrieves calculator history from server
function getHistory() {
    let historyDiv = document.querySelector('#history');
    historyDiv.innerHTML = ``;
    axios.get('/calculator').then((response) => {
        console.log('History:', response.data); // test
        let history = response.data;
        for (let entry of history) {
            // If input is valid
            if (entry.compute == true) {
                historyDiv.innerHTML += `
                    <li><button class="recalculate" onClick="recalculate(${entry.solution})"> 
                        ${entry.firstOperand} 
                        ${entry.operator} 
                        ${entry.secondOperand}
                    </button></li>
                `;
                if (history.length > 0) {
                    lastSolution = history[history.length-1].solution;
                    displayDiv.innerHTML = `=${lastSolution}`;
                }
            }
            // If input is invalid
            else {
                lastSolution = 0;
                displayDiv.innerHTML = '0';
                displayArray = [];
            }
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with GET!');
    });
    console.log('GET successful!');
}

getHistory();

// Adds calculator input to array and displays on DOM
function addToDisplay(buttonContent) {
    // Replaces solution from last calculation
    if (displayDiv.innerHTML == lastSolution
        || displayDiv.innerHTML == `=${lastSolution}`) {
        displayDiv.innerHTML = `${buttonContent}`;
        displayArray = [buttonContent];
        lastSolution = 0;
        operatorBool = false;
    }
    // Adds input after initial input in display
    else {
        // If last input was NOT an operator
        if (operatorBool == false) {
            // If new input IS an operator
            if (buttonContent == '+' || buttonContent == '-' ||
            buttonContent == '/' || buttonContent == 'x') {
                operatorBool = true;
            }
            // If new input is NOT an operator
            else {
                displayDiv.innerHTML += `${buttonContent}`;
            }
            displayArray.push(buttonContent);
        }
        // If last input WAS an operator
        // AND new input is NOT an operator
        else {
            if (buttonContent != '+' && buttonContent != '-' &&
            buttonContent != '/' && buttonContent != 'x') {
                displayDiv.innerHTML = `${buttonContent}`;
                displayArray.push(buttonContent);
                operatorBool = false;
            }
            // If supplied multiple operators in a row
            // only the first one is executed
        }
    }
}

// Clears calculator display when AC is clicked
function clearDisplay() {
    displayDiv.innerHTML = '0';
    displayArray = [];
    lastSolution = 0;
    operatorBool = false;
}

// Recalculates expressions from history when button is clicked
function recalculate(solution) {
    clearDisplay();
    addToDisplay(`=${solution}`);
    lastSolution = `=${solution}`;
}

// Deletes calculator history
function deleteHistory() {
    displayDiv.innerHTML = '0';
    axios.delete('/calculator').then(() => {
        lastSolution = 0;
        displayArray = [];
        operatorBool = false;
        getHistory();
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with DELETE!');
    });
}

// Sends input to server when = is clicked
function sendInput(event) {
    event.preventDefault();
    console.log('POST attempted');
    axios.post('/calculator', displayArray
    ).then((response) => {
        console.log('POST successful!');
        displayArray = [];
        getHistory();
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with POST!');
    });
}