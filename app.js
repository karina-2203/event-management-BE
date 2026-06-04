require("dotenv").config();

const connectDB = require("./libs/helpers/db");
const express = require("express");
const cors = require("cors");
const logger = require("./loggers/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./libs/utils/swagger/swagger");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require("./libs/utils/routes/route")(app);
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
