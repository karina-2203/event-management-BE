const userService = require("../services/userService");
const AppError = require("../libs/helpers/handleException");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res, next) => {
  try {
    const responseData = await userService.createUser(req.body);
    return res.status(StatusCodes.CREATED).json(responseData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
