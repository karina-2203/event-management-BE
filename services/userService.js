const user = require("../models/user");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
  const existingUser = await user.findOne({ email: userData.email });

  if (existingUser) {
    return handleResponse(
      StatusCodes.CONFLICT,
      responseData.ERROR,
      message.EMAIL_ALREADY_EXIST
    );
  }

  // Hash the password before saving
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // Replace plain password with hashed password
  userData.password = hashedPassword;

  const createdUser = await user.create(userData);

  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `User ${message.ADD_SUCCESS}`,
    {
      _id: createdUser._id,
    },
  );
};

/**
 * Generate JWT token for authenticated user
 */
const generateAuthToken = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const login = async (loginData) => {
  const userRecord = await user.findOne({ email: loginData.email });
  if (!userRecord) {
    return handleResponse(
      StatusCodes.UNAUTHORIZED,
      responseData.ERROR,
      message.INVALID_CREDENTIALS,
    );
  }

  // Compare plain password with hashed password
  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    userRecord.password,
  );

  if (!isPasswordValid) {
    return handleResponse(
      StatusCodes.UNAUTHORIZED,
      responseData.ERROR,
      message.INVALID_CREDENTIALS,
    );
  }

  const token = generateAuthToken(userRecord._id);
  const payload = {
    token,
  };

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    message.LOGIN_SUCCESS,
    payload,
  );
};

const getProfile = async (userId) => {
  const userRecord = await user.findById(userId).select("-password");

  if (!userRecord) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.ERROR,
      message.USER_NOT_FOUND,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    undefined,
    userRecord,
  );
};

const updateProfile = async (userId, updateData) => {
  delete updateData.password;
  delete updateData.email;
  delete updateData._id;

  const updatedUser = await user
    .findByIdAndUpdate(userId, updateData, { new: true })
    .select("-password");

  if (!updatedUser) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.ERROR,
      message.USER_NOT_FOUND,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `User ${message.UPDATE_SUCCESS}`
  );
};

module.exports = {
  createUser,
  login,
  getProfile,
  updateProfile
};
