const { StatusCodes } = require("http-status-codes");
const eventService = require("../services/eventService");

const createEvent = async (req, res) => {
  const userId = req.user._id;
  const responseData = await eventService.createEvent(userId, req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  const responseData = await eventService.getEvent(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const editEvent = async (req, res) => {
  const userId = req.user._id;
  const responseData = await eventService.editEvent(userId, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const responseData = await eventService.deleteEvent(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const listEvent = async (req, res) => {
  const responseData = await eventService.listEvent(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const getListEvents = async (_req, res) => {
  const responseData = await eventService.getListEvents();
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  createEvent,
  getEvent,
  editEvent,
  deleteEvent,
  listEvent,
  getListEvents,
};
