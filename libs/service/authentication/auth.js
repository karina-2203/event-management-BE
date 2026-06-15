const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../../utils/enums");
const message = require("../../utils/message");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        status: responseData.ERROR,
        message: message.ACCESS_TOKEN_REQUIRED,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(StatusCodes.FORBIDDEN).json({
          statusCode: StatusCodes.FORBIDDEN,
          status: responseData.ERROR,
          message: message.INVALID_TOKEN,
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: responseData.ERROR,
      message: message.ERROR_AUTHENTICATING_USER,
    });
  }
};

module.exports = {
  authenticateToken,
};
