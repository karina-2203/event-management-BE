const { StatusCodes } = require("http-status-codes");
const reportService = require("../services/reportService");

const eventReport = async (req, res) => {
  const responseData = await reportService.eventReport(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const bookingReport = async (req, res) => {
  const responseData = await reportService.bookingReport(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  eventReport,
  bookingReport,
};
