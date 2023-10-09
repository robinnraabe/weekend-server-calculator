console.log('Script sourced');
let displayArray = [];
let displayDiv = document.querySelector('#display');

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

// Tracks which number/operator buttons are clicked
// and displays on DOM
function updateDisplay(buttonContent) {
        displayDiv.innerHTML += `${buttonContent}`;
        displayArray.push(buttonContent);
        // Update displayArray
        // Clear display on HTML?
}


// Sends input to server when = is clicked
function sendInput(event) {
    event.preventDefault();
    console.log('sendInput');
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

getHistory();
