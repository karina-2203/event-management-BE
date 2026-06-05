const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  const responseData = await userService.createUser(req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

const login = async (req, res, next) => {
  try {
    const responseData = await userService.login(req.body);
    return res.status(StatusCodes.OK).json(responseData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
};
