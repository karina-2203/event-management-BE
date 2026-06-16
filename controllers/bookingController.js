const { StatusCodes } = require("http-status-codes");
const bookingService = require("../services/bookingService");

const createBooking = async (req, res) => {
  const userId = req.user._id;
  const responseData = await bookingService.createBooking(userId, req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

const getBooking = async (req, res) => {
  const { id } = req.params;
  const responseData = await bookingService.getBooking(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const editBooking = async (req, res) => {
  const userId = req.user._id;
  const responseData = await bookingService.editBooking(userId, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const responseData = await bookingService.deleteBooking(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const listBooking = async (req, res) => {
  const responseData = await bookingService.listBooking(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  createBooking,
  getBooking,
  editBooking,
  deleteBooking,
  listBooking,
};
