console.log('Script sourced');

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
