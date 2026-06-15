/**
 * Swagger definitions for the Service module
 */

const serviceTag = {
  name: "Services",
  description: "Service management endpoints",
};

const addServicePath = {
  "/api/serviceMange/addService": {
    post: {
      summary: "Create a new service",
      tags: ["Services"],
      description:
        "Creates a new service. User ID is automatically taken from the authentication token.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "event_manage_id",
                "service_name",
                "service_description",
                "price",
              ],
              properties: {
                event_manage_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc4",
                  description:
                    "MongoDB ObjectId of the event this service belongs to",
                },
                service_name: {
                  type: "string",
                  example: "Catering Service",
                  description: "Name of the service",
                },
                service_description: {
                  type: "string",
                  example: "Premium catering for events",
                  description: "Description of the service",
                },
                price: {
                  type: "number",
                  example: 15000,
                  description: "Price of the service",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Service created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 201,
                  },
                  status: {
                    type: "string",
                    example: "success",
                  },
                  message: {
                    type: "string",
                    example: "Service added successfully.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const viewServicePath = {
  "/api/serviceMange/viewService/{id}": {
    get: {
      summary: "Get service by ID",
      tags: ["Services"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "MongoDB ObjectId of the service",
          schema: {
            type: "string",
            example: "6a2a5e2a35bd7d243a1e92e1",
          },
        },
      ],
      responses: {
        200: {
          description: "Service retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 200,
                  },
                  status: {
                    type: "string",
                    example: "success",
                  },
                  message: {
                    type: "string",
                    example: "Service get successfully.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const editServicePath = {
  "/api/serviceMange/editService": {
    put: {
      summary: "Update an existing service",
      tags: ["Services"],
      description:
        "Updates a service. User ID is automatically taken from the authentication token.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["service_id"],
              properties: {
                service_id: {
                  type: "string",
                  example: "6a2a5e2a35bd7d243a1e92e1",
                  description: "MongoDB ObjectId of the service to update",
                },
                event_manage_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc4",
                  description: "Updated event ID (optional)",
                },
                service_name: {
                  type: "string",
                  example: "Premium Catering Service",
                  description: "Updated service name (optional)",
                },
                service_description: {
                  type: "string",
                  example: "Premium catering with exclusive menu",
                  description: "Updated service description (optional)",
                },
                price: {
                  type: "number",
                  example: 20000,
                  description: "Updated price (optional)",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Service updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 200,
                  },
                  status: {
                    type: "string",
                    example: "success",
                  },
                  message: {
                    type: "string",
                    example: "Service updated successfully.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const deleteServicePath = {
  "/api/serviceMange/deleteService/{id}": {
    delete: {
      summary: "Delete a service",
      tags: ["Services"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "MongoDB ObjectId of the service to delete",
          schema: {
            type: "string",
            example: "6a2a5e2a35bd7d243a1e92e1",
          },
        },
      ],
      responses: {
        200: {
          description: "Service deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 200,
                  },
                  status: {
                    type: "string",
                    example: "success",
                  },
                  message: {
                    type: "string",
                    example: "Service deleted successfully.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const listOfServicePath = {
  "/api/serviceMange/listOfService": {
    post: {
      summary: "Get list of services with search, sorting, and pagination",
      tags: ["Services"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                search: {
                  type: "string",
                  example: "catering",
                  description:
                    "Search term for service name (case-insensitive)",
                },
                page: {
                  type: "integer",
                  minimum: 1,
                  default: 1,
                  example: 1,
                  description: "Page number for pagination",
                },
                limit: {
                  type: "integer",
                  minimum: 1,
                  maximum: 100,
                  default: 10,
                  example: 10,
                  description: "Number of services per page",
                },
                sortOrder: {
                  type: "string",
                  enum: ["asc", "desc"],
                  default: "asc",
                  example: "desc",
                  description: "Sort order (ascending or descending)",
                },
                sortBy: {
                  type: "string",
                  enum: ["service_name", "price", "createdAt", "updatedAt"],
                  default: "service_name",
                  example: "price",
                  description: "Field to sort by",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Services retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: {
                    type: "number",
                    example: 200,
                  },
                  status: {
                    type: "string",
                    example: "success",
                  },
                  message: {
                    type: "string",
                    example: "Service get successfully.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  serviceTag,
  addServicePath,
  viewServicePath,
  editServicePath,
  deleteServicePath,
  listOfServicePath,
};
