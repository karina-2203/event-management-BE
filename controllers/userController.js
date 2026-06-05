const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res, next) => {
  const responseData = await userService.createUser(req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

module.exports = {
  createUser,
};
