// Express
const express = require("express");
const bodyparser = require("body-parser");

const app = express();
/**
 * below express v4 use - < app.use(bodyparser()) > 
 */
app.use(bodyparser.json());

const PORT = 3001;

/**
 * Empty route
 */
app.get('/', (request, response) => {
    response.send("Welcome to sample");
});

/**
 * Route for checking even/odd
 */
app.get('/isEven', (req, res) => {
    // destruction
    const {name, num} = req.query;
    if(num % 2 == 0) {
        res.status(200).json({
            success: true,
            input: num,
            result: "Even Number",
            name: name
        })
    } else {
        res.send(`Odd number`);
    }
})

app.post('/postv1', (req, res) => {
    const {name, number} = req.body;
    if(name && number) {
        res.status(200).json({
            success: true,
            inputName: name,
            inputNumber: number
        })
    } else {
        // BAD REQUEST
        res.status(400).json({
            success: false,
            message: "Enter all mandatory fileds"
        })
    }
})

app.listen(PORT, () => {
    // console.log('App is running', PORT);
       console.log(`App is running ${PORT}`)
})