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

const loginPath = {
  "/api/users/login": {
    post: {
      summary: "User login",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                password: {
                  type: "string",
                  example: "Password@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
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
                    example: "Login successful",
                  },
                  data: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011",
                          },
                          name: {
                            type: "string",
                            example: "John Doe",
                          },
                          email: {
                            type: "string",
                            example: "john@example.com",
                          },
                          role: {
                            type: "string",
                            example: "user",
                          },
                        },
                      },
                    },
                  },
                  error: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        }
      },
    },
  },
};

const fileUploadPath = {
  "/common/file-upload": {
    post: {
      summary: "Upload an image file",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["file"],
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  description: "Image file to upload (max 5MB, images only)",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "File uploaded successfully",
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
                    example: "Added successfully",
                  },
                  data: {
                    type: "string",
                    example: "file-1735245789123-123456789.jpg",
                    description: "Unique filename generated by the system",
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

const profilePath = {
  "/api/users/profile": {
    get: {
      summary: "Get user profile",
      tags: ["Users"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "User profile retrieved successfully",
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
                    example: "User get successfully.",
                  },
                  data: {
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
                      email: {
                        type: "string",
                        example: "john@example.com",
                      },
                      phone_number: {
                        type: "number",
                        example: 9876543210,
                      },
                      profile_image: {
                        type: "string",
                        example: "file-1735245789123-123456789.jpg",
                      },
                      status: {
                        type: "string",
                        example: "active",
                      },
                      role: {
                        type: "string",
                        example: "user",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-12-27T10:30:00.000Z",
                      },
                      updatedAt: {
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
    },
    put: {
      summary: "Update user profile",
      tags: ["Users"],
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
              properties: {
                name: {
                  type: "string",
                  example: "John Updated",
                },
                phone_number: {
                  type: "number",
                  example: 9876543210,
                },
                profile_image: {
                  type: "string",
                  example: "file-1735245789123-123456789.jpg",
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
                newPassword: {
                  type: "string",
                  example: "NewPassword@123",
                  description: "Optional: New password to update",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
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
                    example: "User updated successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "507f1f77bcf86cd799439011",
                      },
                      name: {
                        type: "string",
                        example: "John Updated",
                      },
                      email: {
                        type: "string",
                        example: "john@example.com",
                      },
                      phone_number: {
                        type: "number",
                        example: 9876543210,
                      },
                      profile_image: {
                        type: "string",
                        example: "file-1735245789123-123456789.jpg",
                      },
                      status: {
                        type: "string",
                        example: "active",
                      },
                      role: {
                        type: "string",
                        example: "user",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-12-27T10:30:00.000Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-12-27T11:00:00.000Z",
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
  userTag,
  createUserPath,
  loginPath,
  fileUploadPath,
  profilePath,
};
