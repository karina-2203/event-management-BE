const { StatusCodes } = require("http-status-codes");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");

const fileUpload = (req, res, next) => {
  try {
    const file = req.file || null;
    const response = handleResponse(
      StatusCodes.OK,
      responseData.SUCCESS,
      "File uploaded",
      { file },
    );
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fileUpload,
};
