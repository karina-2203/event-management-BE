const user = require("../models/user");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
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
  const token = jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const login = async ({ email, password }) => {
  const userRecord = await user.findOne({ email: email && email.toLowerCase() });
  if (!userRecord) {
    return handleResponse(
      StatusCodes.UNAUTHORIZED,
      responseData.ERROR,
      "Invalid credentials"
    );
  }

  const stored = userRecord.password || "";
  let match = false;
  // if stored password looks like a bcrypt hash, compare using bcrypt
  if (typeof stored === "string" && stored.startsWith("$2")) {
    match = await bcrypt.compare(password, stored);
  } else {
    match = stored === password;
  }

  if (!match) {
    return handleResponse(
      StatusCodes.UNAUTHORIZED,
      responseData.ERROR,
      "Invalid credentials"
    );
  }

  const userObj = userRecord.toObject ? userRecord.toObject() : userRecord;
  delete userObj.password;

  const token = generateAuthToken(userRecord._id);
  const payload = {
    user: userObj,
    token,
  };

  return handleResponse(StatusCodes.OK, responseData.SUCCESS, "Login successful", payload);
};

module.exports = {
  createUser,
  login,
};
