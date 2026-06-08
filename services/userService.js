const user = require("../models/user");
const otp = require("../models/otp");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const {
  generateOTP,
  calculateExpiryTime,
} = require("../libs/service/commonFunction");
const sendMail = require("../libs/helpers/mail");
const logger = require("../loggers/logger");

const createUser = async (userData) => {
  const existingUser = await user.findOne({ email: userData.email });

  if (existingUser) {
    return handleResponse(
      StatusCodes.CONFLICT,
      responseData.ERROR,
      message.EMAIL_ALREADY_EXIST,
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
    `User ${message.UPDATE_SUCCESS}`,
  );
};

const verifyEmail = async (userData) => {
  const existingUser = await user.findOne({ email: userData.email });

  if (!existingUser) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.ERROR,
      message.USER_NOT_FOUND,
    );
  }

  const generatedOTP = generateOTP();
  const expiryTime = calculateExpiryTime();

  await otp.findOneAndUpdate(
    { email: userData.email },
    {
      otp: generatedOTP,
      expire_time: expiryTime,
    },
    { upsert: true, new: true },
  );

  const templatePath = path.join(__dirname, "../templates/verifyEmail.html");
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  htmlTemplate = htmlTemplate.replace("{{OTP}}", generatedOTP);

  // Send email
  try {
    await sendMail(userData.email, message.EMAIL_VERIFICATION, htmlTemplate);

    return handleResponse(
      StatusCodes.OK,
      responseData.SUCCESS,
      message.OTP_SUCCESS,
    );
  } catch (error) {
    return handleResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      responseData.ERROR,
      message.FAIL_OTP,
    );
  }
};

const updatePassword = async (userData) => {
  const existingUser = await user.findOne({ email: userData.email });

  if (!existingUser) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.ERROR,
      message.USER_NOT_FOUND,
    );
  }

  const otpRecord = await otp.findOne({ email: userData.email });

  if (!otpRecord) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.ERROR,
      message.OTP_NOTFOUND,
    );
  }

  if (otpRecord.otp !== userData.otp) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.ERROR,
      message.INVALID_OTP,
    );
  }

  if (new Date() > otpRecord.expire_time) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.ERROR,
      message.OTP_EXPIRE,
    );
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.newPassword, saltRounds);

  existingUser.password = hashedPassword;
  await existingUser.save();

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    message.PASSWORD_UPDATE_SUCCESSFULLY,
  );
};

const changePassword = async (userId, passwordData) => {
  const userRecord = await user.findById(userId);

  if (!userRecord) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.ERROR,
      message.USER_NOT_FOUND,
    );
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    passwordData.currentPassword,
    userRecord.password,
  );

  if (!isCurrentPasswordValid) {
    return handleResponse(
      StatusCodes.UNAUTHORIZED,
      responseData.ERROR,
      message.CURRENT_PASSWORD,
    );
  }

  const isSameAsOld = await bcrypt.compare(
    passwordData.newPassword,
    userRecord.password,
  );

  if (isSameAsOld) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.ERROR,
      message.NEW_PASSWORD_NOT_MATCHES_CURRENT,
    );
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    passwordData.newPassword,
    saltRounds,
  );

  userRecord.password = hashedPassword;
  await userRecord.save();

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    message.PASSWORD_UPDATE_SUCCESSFULLY,
  );
};

module.exports = {
  createUser,
  login,
  getProfile,
  updateProfile,
  changePassword,
  verifyEmail,
  updatePassword,
};
