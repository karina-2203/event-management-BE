/**
 * Swagger definitions for the User module
 */

const userTag = {
  name: "Users",
  description: "User management endpoints",
};

const createUserPath = {
  "/api/users/create": {
    post: {
      summary: "Create a new user",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "John Doe",
                },
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                password: {
                  type: "string",
                  minLength: 8,
                  example: "Password@123",
                  description:
                    "Must contain uppercase, lowercase, number, and special character",
                },
                phone_number: {
                  type: "string",
                  example: "9876543210",
                },
                profile_image: {
                  type: "string",
                  format: "uri",
                  example: "https://example.com/avatar.png",
                },
                status: {
                  type: "string",
                  enum: ["active", "inactive"],
                  example: "active",
                },
                role: {
                  type: "string",
                  enum: ["user", "organization"],
                  example: "user",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
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

module.exports = { userTag, createUserPath };
