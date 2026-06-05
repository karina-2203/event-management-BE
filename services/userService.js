const user = require("../models/user");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");

const createUser = async (userData) => {
  const createdUser = await user.create(userData);

  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `User ${message.ADD_SUCCESS}`,
    {
      _id: createdUser._id,
    }
  );
};

module.exports = {
  createUser,
};
