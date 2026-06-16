const { StatusCodes } = require("http-status-codes");
const dashboardService = require("../services/dashboardService");

const listLatestEvents = async (_req, res) => {
  const responseData = await dashboardService.listLatestEvents();
  return res.status(StatusCodes.OK).json(responseData);
};

const listLatestBookings = async (_req, res) => {
  const responseData = await dashboardService.listLatestBookings();
  return res.status(StatusCodes.OK).json(responseData);
};

const countOfBookingStatus = async (_req, res) => {
  const responseData = await dashboardService.countOfBookingStatus();
  return res.status(StatusCodes.OK).json(responseData);
};

const countOfTotalUsers = async (_req, res) => {
  const responseData = await dashboardService.countOfTotalUsers();
  return res.status(StatusCodes.OK).json(responseData);
};

const countOfTotalEvents = async (_req, res) => {
  const responseData = await dashboardService.countOfTotalEvents();
  return res.status(StatusCodes.OK).json(responseData);
};

const countOfUserAndBooking = async (_req, res) => {
  const responseData = await dashboardService.countOfUserAndBooking();
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  listLatestEvents,
  listLatestBookings,
  countOfBookingStatus,
  countOfTotalUsers,
  countOfTotalEvents,
  countOfUserAndBooking,
};
