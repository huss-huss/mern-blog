require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect');

const app = express();
const port =  3000;

dbConnect();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

