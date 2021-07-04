/**
 *  * formatting commands
 * ctr+k +f - windows
 * cmd+k +f
 * replacing bulk - ctrl + D
 * searching a key | string in same file -> ctrl + f
 * Searching a file in the project -> ctrl + p (file name)
 * searching a key in entire project -> sht + ctrl + f
 */

// Express
const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const { auth } = require("./middleware/auth")

/**
 * CORS - Cross origin resource sharing
 */
const cors = require("cors");



// uploading middleware
const upload = multer({ dest: "./uploads" });

const app = express();
/**
 * below express v4 use - < app.use(bodyparser()) > 
 */
app.use(bodyparser.json());

app.use(cors({
    origin: ["http://heokuapp.com/wisdom/api", "www.hacker.com"],
    methods: ["GET", "POST"],
}));

// Compo - CORS
// Auth

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
app.get('/calculate', (req, res) => {
    // destruction
    const { name, num } = req.query;
    console.log(req.query);
    if (num % 2 == 0) {
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

app.post('/postv1', auth, (req, res) => {
    const { name, number } = req.body;
    if (name && number) {
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
        // here...
    }
})

/**
 * Middleware - Intrude
 * Authentication
 * File upload - Multer npm package
 */

/**
 * Profile picture uploading
 * single - single file uploading
 * multiple - multiple
 */

/**
 * Single file uploading
 */
app.post('/saveDp', upload.single('dp'), (req, res) => {
    res.send(req.file);
});

/**
 * Multiple image uploading
 */
app.post('/upload/files', upload.array('files'), (req, res) => {
    res.send(req.file);
});





app.listen(PORT, () => {
    // console.log('App is running', PORT);
    console.log(`App is running ${PORT}`)
})