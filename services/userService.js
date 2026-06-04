const User = require("../models/user");
const handleResponse = require("../libs/helpers/handleResponse");
const { ResponseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const { ADD_SUCCESS } = require("../libs/utils/message");
const createUser = async (userData) => {
  const createdUser = await User.create(userData);

  return handleResponse(
    StatusCodes.CREATED,
    ResponseData.SUCCESS,
    ADD_SUCCESS,
    createdUser,
  );
};

module.exports = {
  createUser,
};
