// Express
const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const { auth } = require("./middleware/auth");
const upload = multer({dest: './uploads'})

const app = express();
/**
 * below express v4 use - < app.use(bodyparser()) > 
 */
app.use(bodyparser.json());


const PORT = 3000;

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

/**
 * File Uploading using multer
 * 'image' is the key you keep in request
 * upload.array for multiple
 */
app.post('/save/file', upload.single('image'), (req, res) => {
    res.send(req.file);
});

/**
 * Multiple upload
 */
app.post('/bulk', upload.array('images', 4) , (req, res) =>{
    try {
        res.send(req.files);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});

app.post('/isSecure', auth, (req, res) => {
    res.status(200).json({
        success: true
    })
})

app.listen(process.env.PORT || PORT, () => {
    // console.log('App is running', PORT);
       console.log(`App is running ${PORT}`)
})