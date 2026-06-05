const fs = require("fs").promises;
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");

/**
 * File upload service - handles file upload and converts image to binary
 * @param {Object} fileData - File data from multer
 * @param {Object} error - Multer error if any
 * @returns {Object} Response with file key and binary data
 */
const fileUpload = async (fileData, error = null) => {
  try {
    // Handle Multer errors
    if (error) {
      if (error.name === "MulterError") {
        let errorMessage = error.message;

        // Customize message for file size error
        if (error.code === "LIMIT_FILE_SIZE") {
          const fileName = fileData?.originalname || "File";
          errorMessage = `File ${fileName} ${message.FILE_SIZE_LIMIT}`;
        }

        return handleResponse(
          StatusCodes.BAD_REQUEST,
          responseData.ERROR,
          errorMessage,
          null,
        );
      }

      // Handle file filter errors
      if (error.message === "Only image files are allowed!") {
        return handleResponse(
          StatusCodes.BAD_REQUEST,
          responseData.ERROR,
          message.ONLY_IMAGE_ALLOWED,
          null,
        );
      }

      // Generic error
      return handleResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        responseData.ERROR,
        error.message || message.FILE_UPLOAD_ERROR,
        null,
      );
    }

    if (!fileData) {
      return handleResponse(
        StatusCodes.BAD_REQUEST,
        responseData.ERROR,
        message.NO_FILE_UPLOADED,
        null,
      );
    }

    // Get file path
    const filePath = fileData.path;

    // Read file and convert to binary
    const binaryData = await fs.readFile(filePath);

    // Convert binary to base64 for easy transmission (optional)
    // const base64Data = binaryData.toString("base64");

    return handleResponse(
      StatusCodes.OK,
      responseData.SUCCESS,
      `Image ${message.ADD_SUCCESS}`,
      fileData.filename,
    );
  } catch (error) {
    return handleResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      responseData.ERROR,
      error.message || message.FILE_UPLOAD_ERROR,
      null,
    );
  }
};

module.exports = {
  fileUpload,
};
