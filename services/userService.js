const User = require("../models/user");
const handleResponse = require("../libs/helpers/handleResponse");
const { ResponseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const { ADD_SUCCESS } = require("../libs/utils/message");
const AppError = require("../libs/helpers/handleException");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  const createdUser = await User.create(userData);

  return handleResponse(
    StatusCodes.CREATED,
    ResponseData.SUCCESS,
    ADD_SUCCESS,
    createdUser,
  );
};

/**
 * Generate JWT token for authenticated user
 */
const generateAuthToken = (userId) => {
  const token = jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email && email.toLowerCase() });
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, ResponseData.ERROR, "Invalid credentials");
  }

  const stored = user.password || "";
  let match = false;
  // if stored password looks like a bcrypt hash, compare using bcrypt
  if (typeof stored === "string" && stored.startsWith("$2")) {
    match = await bcrypt.compare(password, stored);
  } else {
    match = stored === password;
  }

  if (!match) {
    throw new AppError(StatusCodes.UNAUTHORIZED, ResponseData.ERROR, "Invalid credentials");
  }

  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;

  // Generate JWT token and attach it to the response
  const token = generateAuthToken(user._id);
  const responseData = {
    user: userObj,
    token,
  };

  return handleResponse(StatusCodes.OK, ResponseData.SUCCESS, "Login successful", responseData);
};

module.exports = {
  createUser,
  login,
};
