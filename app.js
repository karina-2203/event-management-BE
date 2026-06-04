require('dotenv').config();

const connectDB = require('./libs/helpers/db');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

require('./libs/utils/routes/route')(app);
connectDB();

app.use(cors({
    origin: [
        process.env.CORS_ORIGIN
    ]
}));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});