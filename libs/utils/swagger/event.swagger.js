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
              required: ["user_id", "event_name", "event_description"],
              properties: {
                user_id: {
                  type: "string",
                  example: "6a22a4491fdb2e72188de3a5",
                  description: "MongoDB ObjectId of the user creating the event",
                },
                event_name: {
                  type: "string",
                  example: "sangeet",
                  description: "Name of the event",
                },
                event_description: {
                  type: "string",
                  example: "sangeet ceremony",
                  description: "Description of the event",
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
                    example: "Event added successfully",
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
              required: ["event_manage_id"],
              properties: {
                event_manage_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc4",
                  description: "MongoDB ObjectId of the event to update",
                },
                event_name: {
                  type: "string",
                  example: "sangeet2.0",
                  description: "Updated event name (optional)",
                },
                event_description: {
                  type: "string",
                  example: "Updated sangeet ceremony",
                  description: "Updated event description (optional)",
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
                    example: "SUCCESS",
                  },
                  message: {
                    type: "string",
                    example: "Event updated successfully",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
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
    get: {
      summary: "Get list of events with search and pagination",
      tags: ["Events"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          description: "Search term for event name (case-insensitive)",
          schema: {
            type: "string",
            example: "sangeet",
          },
        },
        {
          name: "page",
          in: "query",
          required: false,
          description: "Page number for pagination",
          schema: {
            type: "integer",
            minimum: 1,
            default: 1,
            example: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Number of events per page",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 10,
            example: 10,
          },
        },
        {
          name: "sortOrder",
          in: "query",
          required: false,
          description: "Sort order for event name",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "asc",
            example: "asc",
          },
        },
      ],
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
