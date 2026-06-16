/**
 * Swagger definitions for the User module
 */

const userTag = {
  name: "Users",
  description: "User management endpoints",
};

const createUserPath = {
  "/api/create": {
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
  "/api/login": {
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
        },
      },
    },
  },
};

const fileUploadPath = {
  "/common/fileUpload": {
    post: {
      summary: "Upload single or multiple image files",
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
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  description:
                    "Image file(s) to upload (max 10 files, 5MB each, images only)",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "File(s) uploaded successfully",
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
                    example: "Images added successfully.",
                  },
                  data: {
                    oneOf: [
                      {
                        type: "string",
                        example: "file-1735245789123-123456789.jpg",
                        description:
                          "Single filename when one file is uploaded",
                      },
                      {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: [
                          "file-1735245789123-123456789.jpg",
                          "file-1735245789124-123456790.jpg",
                        ],
                        description:
                          "Array of filenames when multiple files are uploaded",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        400: {
          description: "No file uploaded or validation error",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const getProfilePath = {
  "/api/viewProfile": {
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
  },
};

const updateProfilePath = {
  "/api/editProfile": {
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

const verifyEmailPath = {
  "/api/verifyEmail": {
    post: {
      summary: "verify Email",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "OTP sent successfully",
        },
      },
    },
  },
};

const updatePasswordPath = {
  "/api/updatePassword": {
    put: {
      summary: "Update password using OTP",
      tags: ["Users"],
      description: "Reset password using email verification OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "otp", "newPassword", "confirmPassword"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                otp: {
                  type: "number",
                  minimum: 100000,
                  maximum: 999999,
                  example: 123456,
                  description: "6-digit OTP received via email",
                },
                newPassword: {
                  type: "string",
                  minLength: 8,
                  example: "NewPassword@123",
                  description:
                    "Must contain uppercase, lowercase, number, and special character",
                },
                confirmPassword: {
                  type: "string",
                  minLength: 8,
                  example: "NewPassword@123",
                  description: "Must match newPassword",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password updated successfully",
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
                    example: "Password updated successfully",
                  },
                  data: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid OTP or validation error",
        },
        404: {
          description: "User not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

const changePasswordPath = {
  "/api/changePassword": {
    put: {
      summary: "Change password for authenticated user",
      tags: ["Users"],
      description: "Change password for logged-in user using current password",
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
              required: ["currentPassword", "newPassword", "confirmPassword"],
              properties: {
                currentPassword: {
                  type: "string",
                  example: "OldPassword@123",
                  description: "Current password for verification",
                },
                newPassword: {
                  type: "string",
                  minLength: 8,
                  example: "NewPassword@123",
                  description:
                    "Must contain uppercase, lowercase, number, and special character",
                },
                confirmPassword: {
                  type: "string",
                  minLength: 8,
                  example: "NewPassword@123",
                  description: "Must match newPassword",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Password changed successfully",
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
                    example: "Password changed successfully",
                  },
                  data: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or incorrect current password",
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

const listOfCountryPath = {
  "/api/listOfCountry": {
    get: {
      summary: "Get list of all countries",
      tags: ["Users"],
      description: "Retrieve all available countries",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Countries retrieved successfully",
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
                    example: "Countries get successfully",
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

const listOfStatePath = {
  "/api/listOfState/{countryId}": {
    get: {
      summary: "Get list of states by country",
      tags: ["Users"],
      description: "Retrieve all states for a specific country",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "countryId",
          in: "path",
          required: true,
          description: "MongoDB ObjectId of the country",
          schema: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
          },
        },
      ],
      responses: {
        200: {
          description: "States retrieved successfully",
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
                    example: "States get successfully",
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

const listOfCityPath = {
  "/api/listOfCity/{stateId}": {
    get: {
      summary: "Get list of cities by state",
      tags: ["Users"],
      description: "Retrieve all cities for a specific state",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "stateId",
          in: "path",
          required: true,
          description: "MongoDB ObjectId of the state",
          schema: {
            type: "string",
            example: "507f1f77bcf86cd799439012",
          },
        },
      ],
      responses: {
        200: {
          description: "Cities retrieved successfully",
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
                    example: "Cities get successfully",
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
  getProfilePath,
  updateProfilePath,
  verifyEmailPath,
  updatePasswordPath,
  changePasswordPath,
  listOfCountryPath,
  listOfStatePath,
  listOfCityPath,
};
