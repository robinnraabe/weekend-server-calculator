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
    // Calculate newInput here

    // Creates + pushes new object to calculator history
    // Replace 1s with values after calculating
    let objectToAdd = {
        firstOperand: 1,
        operator: 1,
        secondOperand: 1,
        solution: 1,
    };
    history.push(objectToAdd);
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});