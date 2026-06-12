/**
 * Swagger definitions for the Event module
 */

const eventTag = {
  name: "Events",
  description: "Event management endpoints",
};

const addEventPath = {
  "/api/eventMange/addEvent": {
    post: {
      summary: "Create a new event",
      tags: ["Events"],
      description:
        "Creates a new event. User ID is automatically taken from the authentication token.",
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
              required: ["event_name", "event_description"],
              properties: {
                event_name: {
                  type: "string",
                  example: "Wedding Ceremony",
                  description: "Name of the event",
                },
                event_description: {
                  type: "string",
                  example: "Grand wedding celebration",
                  description: "Description of the event",
                },
                event_image: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: [
                    "file-1781161469640-761494847.png",
                    "file-1781161469641-761494848.png",
                  ],
                  description: "Array of uploaded image filenames (optional)",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Event created successfully",
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
                    example: "Event added successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "6a29062372d3530f311a1fc4",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const viewEventPath = {
  "/api/eventMange/viewEvent/{id}": {
    get: {
      summary: "Get event by ID",
      tags: ["Events"],
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
          description: "MongoDB ObjectId of the event",
          schema: {
            type: "string",
            example: "6a29062372d3530f311a1fc4",
          },
        },
      ],
      responses: {
        200: {
          description: "Event retrieved successfully",
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
                    example: "SUCCESS",
                  },
                  message: {
                    type: "string",
                    example: "Event get successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "6a29062372d3530f311a1fc4",
                      },
                      user_id: {
                        type: "string",
                        example: "6a22a4491fdb2e72188de3a5",
                      },
                      event_name: {
                        type: "string",
                        example: "sangeet",
                      },
                      event_description: {
                        type: "string",
                        example: "sangeet ceremony",
                      },
                      event_image: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: [
                          "file-1781161469640-761494847.png",
                          "file-1781161469641-761494848.png",
                        ],
                        description: "Array of event image filenames",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2026-06-10T06:37:23.952Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2026-06-10T06:37:23.952Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Event not found",
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const editEventPath = {
  "/api/eventMange/editEvent": {
    put: {
      summary: "Update an existing event",
      tags: ["Events"],
      description:
        "Updates an event. User ID is automatically taken from the authentication token. When adding new images, they will be appended to existing images.",
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
              required: ["event_id"],
              properties: {
                event_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc4",
                  description: "MongoDB ObjectId of the event to update",
                },
                event_name: {
                  type: "string",
                  example: "Updated Wedding Ceremony",
                  description: "Updated event name (optional)",
                },
                event_description: {
                  type: "string",
                  example: "Updated grand wedding celebration",
                  description: "Updated event description (optional)",
                },
                event_image: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["file-1781161469642-761494849.png"],
                  description:
                    "Array of new image filenames to add (optional). New images will be appended to existing images, not replaced.",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Event updated successfully",
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
                    example: "Event updated successfully.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or event_id required",
        },
        404: {
          description: "Event not found",
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const deleteEventPath = {
  "/api/eventMange/deleteEvent/{id}": {
    delete: {
      summary: "Delete an event",
      tags: ["Events"],
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
          description: "MongoDB ObjectId of the event to delete",
          schema: {
            type: "string",
            example: "6a29062372d3530f311a1fc4",
          },
        },
      ],
      responses: {
        200: {
          description: "Event deleted successfully",
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
                    example: "SUCCESS",
                  },
                  message: {
                    type: "string",
                    example: "Event deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Event not found",
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const listOfEventPath = {
  "/api/eventMange/listOfEvent": {
    post: {
      summary: "Get list of events with search and pagination",
      tags: ["Events"],
      description:
        "Retrieves a paginated list of events with optional search and sorting. All parameters are optional.",
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
                  example: "sangeet",
                  description: "Search term for event name (case-insensitive)",
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
                  description: "Number of events per page",
                },
                sortOrder: {
                  type: "string",
                  enum: ["asc", "desc"],
                  default: "asc",
                  example: "asc",
                  description: "Sort order for event name",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Events retrieved successfully",
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
                    example: "SUCCESS",
                  },
                  message: {
                    type: "string",
                    example: "Event get successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      events: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "6a29062372d3530f311a1fc4",
                            },
                            user_id: {
                              type: "string",
                              example: "6a22a4491fdb2e72188de3a5",
                            },
                            event_name: {
                              type: "string",
                              example: "sangeet",
                            },
                            event_description: {
                              type: "string",
                              example: "sangeet ceremony",
                            },
                            event_image: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                              example: ["file-1781161469640-761494847.png"],
                              description: "Array of event image filenames",
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                              example: "2026-06-10T06:37:23.952Z",
                            },
                            updatedAt: {
                              type: "string",
                              format: "date-time",
                              example: "2026-06-10T06:37:23.952Z",
                            },
                          },
                        },
                      },
                      pagination: {
                        type: "object",
                        properties: {
                          currentPage: {
                            type: "integer",
                            example: 1,
                          },
                          totalPages: {
                            type: "integer",
                            example: 5,
                          },
                          totalEvents: {
                            type: "integer",
                            example: 50,
                          },
                          limit: {
                            type: "integer",
                            example: 10,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
        },
        400: {
          description: "Validation error",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

module.exports = {
  eventTag,
  addEventPath,
  viewEventPath,
  editEventPath,
  deleteEventPath,
  listOfEventPath,
};
