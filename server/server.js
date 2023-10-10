const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.static('server/public'));

let history = [
    {
        // test object
        compute: true,
        firstOperand: 'example: 5',
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
    let firstOperand = '';
    let secondOperand = '';
    // Assigns operator
    for (let str of newInput) {
        // Assigns operator
        if (str == '+' || 
        str == '-' || 
        str == '/' || 
        str == 'x') {
            operator = str;
        } 
    }
    // Finds index of operator and assigns
    // operands based on its index
    let index = newInput.indexOf(operator);
    for (let str of newInput.slice(0, index)) {
        firstOperand += str;
    }
    for (let str of newInput.slice(index+1)) {
        secondOperand += str;
    }
    if (firstOperand != '' && secondOperand != '') {
        firstOperand = Number(firstOperand);
        secondOperand = Number(secondOperand);
        // Computes solution
        if (operator == 'x') {
            solution = firstOperand * secondOperand;
        }
        else if (operator == '/') {
            solution = firstOperand / secondOperand;
            operator = '&#247;'; // For styling
        }
        else if (operator == '+') {
            solution = firstOperand + secondOperand;
        }
        else if (operator == '-') {
            solution = firstOperand - secondOperand;
        }
    }
    else {
            solution = null;
    }
    // Creates + pushes new object to calculator history
    let newObject = {
        compute: true,
        firstOperand: firstOperand,
        operator: operator,
        secondOperand: secondOperand,
        solution: solution
    };
    if (newObject.solution != null 
        && isNaN(solution) == false 
        && firstOperand != '' 
        && secondOperand != '') {
        history.push(newObject);
    }
    else {
        newObject = {
            compute: false,
            solution: 0
        }
        history.push(newObject);
    }
    res.sendStatus(201);
});

app.delete('/calculator', (req, res) => {
    history = [];
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});