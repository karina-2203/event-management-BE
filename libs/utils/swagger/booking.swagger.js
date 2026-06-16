/**
 * Swagger definitions for the Booking module
 */

const bookingTag = {
  name: "Bookings",
  description: "Booking management endpoints",
};

const addBookingPath = {
  "/api/booking/addBooking": {
    post: {
      summary: "Create a new booking",
      tags: ["Bookings"],
      description:
        "Creates a new booking. User ID is automatically taken from the authentication token.",
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
                "address_id",
                "event_manage_id",
                "event_date",
                "additional_information",
              ],
              properties: {
                address_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc4",
                  description: "MongoDB ObjectId of the address",
                },
                event_manage_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc5",
                  description: "MongoDB ObjectId of the event",
                },
                event_date: {
                  type: "string",
                  example: "2026-06-15",
                  description: "Date of the event",
                },
                additional_information: {
                  type: "string",
                  example: "Please arrange seating for 100 guests",
                  description: "Additional notes or requirements",
                },
                status: {
                  type: "string",
                  example: "pending",
                  description: "Booking status (optional)",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Booking created successfully",
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
                    example: "Booking added successfully.",
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

const viewBookingPath = {
  "/api/booking/viewBooking/{id}": {
    get: {
      summary: "Get booking by ID",
      tags: ["Bookings"],
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
          description: "MongoDB ObjectId of the booking",
          schema: {
            type: "string",
            example: "6a2a5e2a35bd7d243a1e92e1",
          },
        },
      ],
      responses: {
        200: {
          description: "Booking retrieved successfully",
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
                    example: "Booking get successfully.",
                  },
                  data: {
                    type: "object",
                    description: "Booking details",
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

const editBookingPath = {
  "/api/booking/editBooking": {
    put: {
      summary: "Update an existing booking",
      tags: ["Bookings"],
      description:
        "Updates a booking. User ID is automatically taken from the authentication token.",
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
              required: ["booking_id"],
              properties: {
                booking_id: {
                  type: "string",
                  example: "6a2a5e2a35bd7d243a1e92e1",
                  description: "MongoDB ObjectId of the booking to update",
                },
                address_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc4",
                  description: "Updated address ID (optional)",
                },
                event_manage_id: {
                  type: "string",
                  example: "6a29062372d3530f311a1fc5",
                  description: "Updated event ID (optional)",
                },
                event_date: {
                  type: "string",
                  example: "2026-06-20",
                  description: "Updated event date (optional)",
                },
                additional_information: {
                  type: "string",
                  example: "Updated seating arrangement for 150 guests",
                  description: "Updated additional information (optional)",
                },
                status: {
                  type: "string",
                  example: "confirmed",
                  description: "Updated booking status (optional)",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Booking updated successfully",
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
                    example: "Booking updated successfully.",
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

const deleteBookingPath = {
  "/api/booking/deleteBooking/{id}": {
    delete: {
      summary: "Delete a booking (soft delete)",
      tags: ["Bookings"],
      description: "Soft deletes a booking by setting isDeleted flag to true",
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
          description: "MongoDB ObjectId of the booking to delete",
          schema: {
            type: "string",
            example: "6a2a5e2a35bd7d243a1e92e1",
          },
        },
      ],
      responses: {
        200: {
          description: "Booking deleted successfully",
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
                    example: "Booking deleted successfully.",
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

const listOfBookingPath = {
  "/api/booking/listOfBooking": {
    post: {
      summary: "Get list of bookings with search, sorting, and pagination",
      tags: ["Bookings"],
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
                  example: "event",
                  description: "Search term (case-insensitive)",
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
                  description: "Number of bookings per page",
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
                  enum: ["event_date", "status", "createdAt", "updatedAt"],
                  default: "createdAt",
                  example: "event_date",
                  description: "Field to sort by",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Bookings retrieved successfully",
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
                    example: "Booking get successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      services: {
                        type: "array",
                        description: "Array of booking objects",
                      },
                      pagination: {
                        type: "object",
                        properties: {
                          currentPage: {
                            type: "number",
                            example: 1,
                          },
                          totalPages: {
                            type: "number",
                            example: 5,
                          },
                          totalBooking: {
                            type: "number",
                            example: 50,
                          },
                          limit: {
                            type: "number",
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
      },
    },
  },
};

module.exports = {
  bookingTag,
  addBookingPath,
  viewBookingPath,
  editBookingPath,
  deleteBookingPath,
  listOfBookingPath,
};
