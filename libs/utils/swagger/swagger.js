const swaggerJsdoc = require("swagger-jsdoc");

// Import swagger definitions from each module
const {
  userTag,
  createUserPath,
  loginPath,
  fileUploadPath,
  getProfilePath,
  updateProfilePath,
  verifyEmailPath,
  updatePasswordPath,
  changePasswordPath,
  listOfCountryPath,
  listOfStatePath,
  listOfCityPath,
} = require("./user.swagger");

const {
  eventTag,
  addEventPath,
  viewEventPath,
  editEventPath,
  deleteEventPath,
  listOfEventPath,
  listOfDropdownEventsPath,
} = require("./event.swagger");

const {
  serviceTag,
  addServicePath,
  viewServicePath,
  editServicePath,
  deleteServicePath,
  listOfServicePath,
} = require("./service.swagger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Management API Documentation",
      version: "1.0.0",
      description:
        "Complete API endpoints documentation for Event Management System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    tags: [userTag, eventTag, serviceTag],
    paths: {
      // User paths
      ...createUserPath,
      ...loginPath,
      ...fileUploadPath,
      ...getProfilePath,
      ...updateProfilePath,
      ...verifyEmailPath,
      ...updatePasswordPath,
      ...changePasswordPath,
      ...listOfCountryPath,
      ...listOfStatePath,
      ...listOfCityPath,

      // Event paths
      ...addEventPath,
      ...viewEventPath,
      ...editEventPath,
      ...deleteEventPath,
      ...listOfEventPath,
      ...listOfDropdownEventsPath,

      // Service paths
      ...addServicePath,
      ...viewServicePath,
      ...editServicePath,
      ...deleteServicePath,
      ...listOfServicePath,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in format: Bearer <token>",
        },
      },
    },
  },
  apis: [], // paths are now managed via JS imports above
};

module.exports = swaggerJsdoc(options);
