console.log('Script sourced');
let displayArray = [];
let displayDiv = document.querySelector('#display');
let operatorBool = false;

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
    // Replaces default 0 with new input in display
    if (displayDiv.innerHTML == '0') {
        displayDiv.innerHTML = `${buttonContent}`;
        displayArray.push(buttonContent);
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
        }
    }
}

// Clears calculator display when AC is clicked
function clearDisplay() {
    displayDiv.innerHTML = '0';
    displayArray = [];
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
        displayDiv.innerHTML = '0';
        displayArray = [];
        getHistory();
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with POST!');
    });
}