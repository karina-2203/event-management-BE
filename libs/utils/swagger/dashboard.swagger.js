/**
 * Swagger definitions for the Dashboard module
 */

const dashboardTag = {
  name: "Dashboard",
  description: "Dashboard analytics and statistics endpoints",
};

const listOfLatestEventPath = {
  "/dashboard/listOfLatestEvent": {
    get: {
      summary: "Get list of latest events",
      tags: ["Dashboard"],
      description: "Retrieve the most recent events",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Latest events retrieved successfully",
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
                    example: "Events retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "507f1f77bcf86cd799439011",
                        },
                        event_name: {
                          type: "string",
                          example: "Birthday Party",
                        },
                        event_description: {
                          type: "string",
                          example: "Annual celebration event",
                        },
                        event_image: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: ["event_image-1781095893604-985459958.webp"],
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2024-12-27T10:30:00.000Z",
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
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const listOfLatestBookingPath = {
  "/dashboard/listOfLatestBooking": {
    get: {
      summary: "Get list of latest bookings",
      tags: ["Dashboard"],
      description: "Retrieve the most recent bookings",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Latest bookings retrieved successfully",
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
                    example: "Bookings retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "507f1f77bcf86cd799439012",
                        },
                        user_id: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "507f1f77bcf86cd799439011",
                            },
                            name: {
                              type: "string",
                              example: "John Doe",
                            },
                          },
                        },
                        event_manage_id: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "507f1f77bcf86cd799439013",
                            },
                            event_name: {
                              type: "string",
                              example: "Birthday Party",
                            },
                          },
                        },
                        event_date: {
                          type: "string",
                          format: "date-time",
                          example: "2024-12-30T00:00:00.000Z",
                        },
                        status: {
                          type: "string",
                          example: "pending",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2024-12-27T10:30:00.000Z",
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
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const countOfBookingStatusPath = {
  "/dashboard/countOfBookingStatus": {
    get: {
      summary: "Get count of bookings by status",
      tags: ["Dashboard"],
      description:
        "Retrieve booking counts grouped by status (pending, approved, cancelled)",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Booking status counts retrieved successfully",
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
                    example: "Booking status counts retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      pending: {
                        type: "number",
                        example: 15,
                      },
                      approved: {
                        type: "number",
                        example: 32,
                      },
                      cancelled: {
                        type: "number",
                        example: 8,
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
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const countOfTotalUserPath = {
  "/dashboard/countOfTotalUser": {
    get: {
      summary: "Get total user count",
      tags: ["Dashboard"],
      description: "Retrieve the total number of registered users",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Total user count retrieved successfully",
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
                    example: "Total users retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      totalUsers: {
                        type: "number",
                        example: 150,
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
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const countOfTotalEventPath = {
  "/dashboard/countOfTotalEvent": {
    get: {
      summary: "Get total event count",
      tags: ["Dashboard"],
      description: "Retrieve the total number of events",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Total event count retrieved successfully",
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
                    example: "Total events retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      totalEvents: {
                        type: "number",
                        example: 45,
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
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const graphOfUserPath = {
  "/dashboard/graphOfUser": {
    get: {
      summary: "Get user and booking graph data",
      tags: ["Dashboard"],
      description:
        "Retrieve monthly statistics for users and bookings for graph visualization",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Graph data retrieved successfully",
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
                    example: "Graph data retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      userStats: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            month: {
                              type: "string",
                              example: "January",
                            },
                            count: {
                              type: "number",
                              example: 12,
                            },
                          },
                        },
                        example: [
                          { month: "January", count: 12 },
                          { month: "February", count: 15 },
                          { month: "March", count: 18 },
                        ],
                      },
                      bookingStats: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            month: {
                              type: "string",
                              example: "January",
                            },
                            count: {
                              type: "number",
                              example: 25,
                            },
                          },
                        },
                        example: [
                          { month: "January", count: 25 },
                          { month: "February", count: 30 },
                          { month: "March", count: 28 },
                        ],
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
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

module.exports = {
  dashboardTag,
  listOfLatestEventPath,
  listOfLatestBookingPath,
  countOfBookingStatusPath,
  countOfTotalUserPath,
  countOfTotalEventPath,
  graphOfUserPath,
};
