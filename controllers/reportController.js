const { StatusCodes } = require("http-status-codes");
const reportService = require("../services/reportService");

const eventReport = async (req, res) => {
  const userRole = req.user.role;
  const responseData = await reportService.eventReport(userRole, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const bookingReport = async (req, res) => {
  const userRole = req.user.role;
  const responseData = await reportService.bookingReport(userRole, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  eventReport,
  bookingReport,
};
