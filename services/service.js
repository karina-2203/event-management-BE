const service = require("../models/service");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");

const createService = async (userId, serviceData) => {
  const addServiceData = {
    ...serviceData,
    user_id: new mongoose.Types.ObjectId(userId),
  };

  const createdService = await service.create(addServiceData);

  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `Service ${message.ADD_SUCCESS}`,
    {
      _id: createdService._id,
    },
  );
};

const getService = async (id) => {
  const serviceId = new mongoose.Types.ObjectId(id);
  const serviceData = await service.findOne({
    _id: serviceId,
    isDeleted: false,
  });
  if (!serviceData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Service ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Service ${message.GET_SUCCESS}`,
    serviceData,
  );
};

const editService = async (userId, serviceData) => {
  const { service_id, ...updateData } = serviceData;

  if (!service_id) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.FAILED,
      message.SERVICE_ID_REQUIRED,
    );
  }

  const serviceId = new mongoose.Types.ObjectId(service_id);

  const updateServiceData = {
    ...updateData,
    user_id: new mongoose.Types.ObjectId(userId),
  };

  const updatedService = await service.findByIdAndUpdate(
    serviceId,
    updateServiceData,
    { new: true },
  );

  if (!updatedService) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Service ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Service ${message.UPDATE_SUCCESS}`,
  );
};

const deleteService = async (id) => {
  const serviceId = new mongoose.Types.ObjectId(id);
  const serviceData = await service.findByIdAndUpdate(
    serviceId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  if (!serviceData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Service ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Service ${message.DELETE_SUCCESS}`,
  );
};

const listService = async (payload) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortOrder = "asc",
    sortBy = "service_name",
  } = payload || {};

  let filter = { isDeleted: false };

  if (search) {
    filter = {
      service_name: { $regex: search, $options: "i" },
    };
  }

  const skip = (page - 1) * limit;

  const sort = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sort.service_name = sortOrder === "desc" ? -1 : 1;
  }

  const listAllServices = await service
    .find(filter)
    .limit(parseInt(limit))
    .skip(skip)
    .sort(sort);

  const totalService = await service.countDocuments(filter);

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Service ${message.GET_SUCCESS}`,
    {
      services: listAllServices,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalService / limit),
        totalService,
        limit: parseInt(limit),
      },
    },
  );
};

module.exports = {
  createService,
  getService,
  editService,
  deleteService,
  listService,
};
