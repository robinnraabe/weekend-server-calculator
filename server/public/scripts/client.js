console.log('Script sourced');
let displayArray = [];
let displayDiv = document.querySelector('#display');
let operatorBool = false;
let lastSolution = 0;

function getHistory() {
    let historyDiv = document.querySelector('#history');
    historyDiv.innerHTML = `<button onClick="deleteHistory()">Delete Calculator History</button>`;
    axios.get('/calculator').then((response) => {
        console.log('History:', response.data);
        let history = response.data;
        for (let entry of history) {
            historyDiv.innerHTML += `
                <li>
                    ${entry.firstOperand} ${entry.operator} 
                    ${entry.secondOperand} = ${entry.solution}
                </li>
            `;
        }
        lastSolution = history[history.length-1].solution;
        displayDiv.innerHTML = `= ${lastSolution}`;

    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with GET!');
    });
    console.log('getHistory successful!');
}

getHistory();

// Adds calculator input to array and displays on DOM
function addToDisplay(buttonContent) {
    console.log(displayDiv.innerHTML);
    // Replaces solution from last calculation
    if (displayDiv.innerHTML == lastSolution
        || displayDiv.innerHTML == `= ${lastSolution}`) {
        displayDiv.innerHTML = `${buttonContent}`;
        displayArray.push(buttonContent);
        lastSolution = 0;
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
            // If supplied multipl operators in a row
            // only the first one is executed
        }
    }
}

// Clears calculator display when AC is clicked
function clearDisplay() {
    displayDiv.innerHTML = '0';
    displayArray = [];
    lastSolution = 0;
}

// Deletes calculator history
function deleteHistory() {
    displayDiv.innerHTML = '0';
    axios.delete('/calculator').then(() => {
        getHistory();
        console.log('getHistory executed after DELETE');
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with DELETE!');
    });
}

// Sends input to server when = is clicked
function pushInput(event) {
    event.preventDefault();
    console.log('sendInput');
    console.log(displayArray);
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