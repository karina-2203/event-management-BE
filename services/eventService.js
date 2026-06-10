const event = require("../models/event");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../libs/utils/enums");

const createEvent = async (serviceData) => {
  if (serviceData.user_id) {
    serviceData.user_id = new mongoose.Types.ObjectId(serviceData.user_id);
  }

  const createdEvent = await event.create(serviceData);

  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `Event ${message.ADD_SUCCESS}`,
    {
      _id: createdEvent._id,
    },
  );
};

const getEvent = async (id) => {
  const eventId = new mongoose.Types.ObjectId(id);
  const eventData = await event.findById(eventId);

  if (!eventData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Event ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event ${message.GET_SUCCESS}`,
    eventData,
  );
};

const editEvent = async (eventData) => {
  const { event_manage_id, ...updateData } = eventData;

  if (!event_manage_id) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.FAILED,
      "Event ID is required",
    );
  }

  const eventId = new mongoose.Types.ObjectId(event_manage_id);

  const updatedEvent = await event.findByIdAndUpdate(eventId, updateData, {
    new: true,
  });

  if (!updatedEvent) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Event ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event ${message.UPDATE_SUCCESS}`,
  );
};

const deleteEvent = async (id) => {
  const eventId = new mongoose.Types.ObjectId(id);
  const deletedEvent = await event.findByIdAndDelete(eventId);

  if (!deletedEvent) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Event ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event ${message.DELETE_SUCCESS}`,
  );
};

const listEvent = async (payload) => {
  const { search, page = 1, limit = 10, sortOrder = "asc" } = payload || {};

  let filter = {};
  if (search) {
    filter = {
      event_name: { $regex: search, $options: "i" },
    };
  }

  const skip = (page - 1) * limit;

  const sort = { event_name: sortOrder === "desc" ? -1 : 1 };

  const listAllEvents = await event
    .find(filter)
    .limit(parseInt(limit))
    .skip(skip)
    .sort(sort);

  const totalEvents = await event.countDocuments(filter);

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event ${message.GET_SUCCESS}`,
    {
      events: listAllEvents,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalEvents / limit),
        totalEvents,
        limit: parseInt(limit),
      },
    },
  );
};

module.exports = {
  createEvent,
  getEvent,
  editEvent,
  deleteEvent,
  listEvent,
};
