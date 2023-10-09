const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.static('server/public'));

let history = [
    {
        // test object
        firstOperand: 5,
        operator: 'x',
        secondOperand: 3,
        solution: 15
    }
];

app.get('/calculator', (req, res) => {
    console.log('Request made for /calculator');
    res.send(history);
});

app.post('/calculator', (req, res) => {
    console.log('Req.body:', req.body);
    let newInput = req.body;
    let operator;
    let solution;
     // Calculation goes here!
    // Declares operator
    for (let str of newInput) {
        // Assigns operator
        if (str == '+' || 
        str == '-' || 
        str == '/' || 
        str == 'x') {
            operator = str;
        } 
    }
    let index = newInput.indexOf(operator);
    // Declares operands
    let firstOperand = '';
    let secondOperand = '';
    for (let str of newInput.slice(0, index)) {
        firstOperand += str;
    }
    for (let str of newInput.slice(index+1)) {
        secondOperand += str;
    }
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    console.log(firstOperand, operator, secondOperand); // test
    // Computes solution
    if (operator == 'x') {
        solution = firstOperand * secondOperand;
    }
    else if (operator == '/') {
        solution = firstOperand / secondOperand;
        operator = '&#247;';
    }
    else if (operator == '+') {
        solution = firstOperand + secondOperand;
    }
    else if (operator == '-') {
        solution = firstOperand - secondOperand;
    }
    else {
        solution = null;
    }
    // Creates + pushes new object to calculator history
    let newObject = {
        firstOperand: firstOperand,
        operator: operator,
        secondOperand: secondOperand,
        solution: solution
    };
    if (solution != null) {
        history.push(newObject);
    }
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});