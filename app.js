require("dotenv").config();

const connectDB = require("./libs/helpers/db");
const express = require("express");
const cors = require("cors");
const logger = require("./loggers/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./libs/utils/swagger/swagger");
const { handleException } = require("./libs/helpers/handleException");
const path = require("path");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
  }),
);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require("./routes/route")(app);
connectDB();

// Global exception filter (must be last middleware)
app.use(handleException);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  logger.info(
    `Uploaded files available at http://localhost:${PORT}/uploads/<filename>`,
  );
});
