# Project Name
Weekend Server Calculator

## Description
To start:
    `npm install express`
    `npm start`

The organization for this one feels more convoluted than I'd like, but I did what I needed to do to get all of the functionality and styling that I wanted. 

Especially difficult was getting the inputs to display on the calculator 'screen' like it would on a real calculator (which wasn't a requirement but a goal of my own). It required adding a lot of extra code (particularly many conditionals) into the client.js file that muddied its readability but made the calculator look much cooler. Hopefully the comments are enough to explain what each chunk of code does.

Computing the solutions on the server-side also took some time. The primary issue was adding all the extra code to prevent the server from storing bad inputs and from making any of it visible on the display.

# Functionality
In short, the buttons on the calculator add their contents to an array, which is submitted to the server when the equal sign is clicked. 
The array is parsed to determine the two operands and the operator, and a solution is calculated. If the array contains bad data, the server adds a partial object to the array, with just enough data to tell the client NOT to post that object to the DOM, and how to reset the calculator's display. 
Ideally it would be nice to determine if the data was good BEFORE sending to server, but it was easier to keep track of the display calculations on the client.js vs the math/validity calculations on the server.

Types of bad data that were considered:
    - Starting or ending with an operator 
            eg.  - 67 +/
            =>    null
        - These are noted as invalid and do not get added to the display.
    
    - Not including an operator or missing an operand
            eg.  66     eg.  x+
            =>  null    =>  null
        - These are noted as invalid and do not get added to the display.

    - Multiple operators
            eg.  8 x+/ 2
            =>   8 x 2
        - The first operator overrides the others and the expression is calculated as such. 

    - More than 2 operands separated by operators
            eg.  6 x 5 - 12
            =>      null
        - These are noted as invalid and do not get added to the display. (I would like to make this work later if I have time.)

Big Idea Checklist:
- ✅ Set up and linked base files
- ✅ Created buttons for all numbers, operators, + clear option 
- ✅ Created function for updating and clearing calculator display
- ✅ (client GET) Retrieve history from server 
- ✅ (server GET) Send history to client when requested
- ✅ (client POST) Send user input to server 
- ✅ (server POST) Retrieve input, calculate output, add both to history
- ✅ Finished styling 
- ✅ (client DELETE + server DELETE) Remove history from server and display
- ✅ Added ability to click an expression and re-run calculation

Total Commits: 12
