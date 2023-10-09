console.log('Script sourced');
let displayArray = [];
let displayDiv = document.querySelector('#display');
let operatorBool = false;

function getHistory() {
    let historyDiv = document.querySelector('#history');
    historyDiv.innerHTML = '';
    axios.get('/calculator').then((response) => {
        console.log('History:', response.data);
        let history = response.data;
        for (let entry of history) {
            console.log(entry);
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

// Tracks which number/operator buttons are clicked
// and displays on DOM
function addToDisplay(buttonContent) {
    console.log(displayDiv.innerHTML);
    // Replaces default 0 with new input in display
    if (displayDiv.innerHTML == '0') {
        displayDiv.innerHTML = `${buttonContent}`;
    }
    // Adds input after initial input in display
    else {
        if (operatorBool == false) {
            if (buttonContent == '+' || buttonContent == '-' ||
            buttonContent == '/' || buttonContent == 'x') {
            operatorBool = true;
            }
            if (operatorBool == false) {
                displayDiv.innerHTML += `${buttonContent}`;
            }
        }
        else {
            displayDiv.innerHTML = `${buttonContent}`;
            operatorBool = false;
        }
    }
    displayArray.push(buttonContent);
}

// function for operators that sets operatorBool=false 
// and adds operator to div?

// Sends input to server when = is clicked
function sendInput(event) {
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

function clear(event) {
    event.preventDefault();
        // Clears inputs for next round

        // This needs to clear the client post before posting!
}