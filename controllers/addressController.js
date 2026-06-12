const { StatusCodes } = require("http-status-codes");
const addressService = require("../services/addressService");

const addAddress = async (req, res) => {
  const userId = req.user._id;
  const responseData = await addressService.addAddress(userId, req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

const viewAddress = async (req, res) => {
  const { id } = req.params;
  const responseData = await addressService.viewAddress(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const editAddress = async (req, res) => {
  const userId = req.user._id;
  const responseData = await addressService.editAddress(userId, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const responseData = await addressService.deleteAddress(id);
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  addAddress,
  viewAddress,
  editAddress,
  deleteAddress,
};
