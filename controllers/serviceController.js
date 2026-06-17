const { StatusCodes } = require("http-status-codes");
const service = require("../services/service");

const createService = async (req, res) => {
  const userId = req.user._id;
  const responseData = await service.createService(userId, req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

const getService = async (req, res) => {
  const { id } = req.params;
  const responseData = await service.getService(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const editService = async (req, res) => {
  const userId = req.user._id;
  const responseData = await service.editService(userId, req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  const responseData = await service.deleteService(id);
  return res.status(StatusCodes.OK).json(responseData);
};

const listService = async (req, res) => {
  const responseData = await service.listService(req.body);
  return res.status(StatusCodes.OK).json(responseData);
};

module.exports = {
  createService,
  getService,
  editService,
  deleteService,
  listService,
};
