const { StatusCodes } = require("http-status-codes");
const fileUploadService = require("../services/fileUploadService");
const upload = require("../libs/helpers/multer");

const fileUpload = async (req, res) => {
  const responseData = await fileUploadService.fileUpload(
    req.files || req.file,
  );
  return res
    .status(responseData.statusCode || StatusCodes.OK)
    .json(responseData);
};

const handleMulterError = async (err, req, res, next) => {
  if (err) {
    const responseData = await fileUploadService.fileUpload(
      req.files || req.file,
      err,
    );
    return res
      .status(responseData.statusCode || StatusCodes.BAD_REQUEST)
      .json(responseData);
  }

  next();
};

module.exports = {
  fileUpload: [upload.array("file", 5), handleMulterError, fileUpload],
};
