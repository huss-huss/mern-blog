require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const app = express();
const port =  3000;

dbConnect();

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        sucess: false,
        statusCode,
        message
    });
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

