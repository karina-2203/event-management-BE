const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  const responseData = await userService.createUser(req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

const login = async (req, res) => {
  const responseData = await userService.login(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const getProfile = async (req, res) => {
  const userId = req.user._id;
  const responseData = await userService.getProfile(userId);
  return res.status(StatusCodes.OK).json(responseData);
};

const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const responseData = await userService.updateProfile(userId, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const verifyEmail = async (req, res) => {
  const responseData = await userService.verifyEmail(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const updatePassword = async (req, res) => {
  const responseData = await userService.updatePassword(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const changePassword = async (req, res) => {
  const userId = req.user._id;
  const responseData = await userService.changePassword(userId, req.body);
  return res.status(StatusCodes.OK).json(responseData);
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
