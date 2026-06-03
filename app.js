require('dotenv').config();

const connectDB = require('./libs/helpers/db');
const express = require('express');
const cors = require('cors');
const app = express();

connectDB();

app.use(cors({
    origin: [
        'http://localhost:5000'
    ]
}));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});