const swaggerJsdoc = require("swagger-jsdoc");

// Import swagger definitions from each module
const {
  userTag,
  createUserPath,
  loginPath,
  fileUploadPath,
  getProfilePath,
  updateProfilePath,
} = require("./user.swagger");

// Add new module swagger imports here as the project grows:
// const { authTag, loginPath } = require("./auth.swagger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API endpoints documentation",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    tags: [
      userTag,
      // authTag,
    ],
    paths: {
      ...createUserPath,
      ...loginPath,
      ...fileUploadPath,
      ...getProfilePath,
      ...updateProfilePath,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [], // paths are now managed via JS imports above
};

module.exports = swaggerJsdoc(options);
