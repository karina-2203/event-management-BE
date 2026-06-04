require('dotenv').config();

const connectDB = require('./libs/helpers/db');
const express = require('express');
const cors = require('cors');
const logger = require('./loggers/logger')
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
    logger.info(`Server started on port ${PORT}`);
});