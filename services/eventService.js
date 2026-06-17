const event = require("../models/event");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../libs/utils/enums");

const createEvent = async (userId, eventData) => {
  const serviceData = {
    ...eventData,
    user_id: new mongoose.Types.ObjectId(userId),
  };

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
  const eventData = await event.findOne({ _id: eventId, isDeleted: false });

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

const editEvent = async (userId, eventData) => {
  const { event_id, ...updateData } = eventData;

  if (!event_id) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.FAILED,
      message.EVENT_ID_REQUIRED,
    );
  }

  const eventId = new mongoose.Types.ObjectId(event_id);

  const currentEvent = await event.findOne({ _id: eventId, isDeleted: false });

  if (!currentEvent) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Event ${message.NOT_FOUND}`,
    );
  }

  if (updateData.event_image && Array.isArray(updateData.event_image)) {
    const existingImages = currentEvent.event_image || [];
    updateData.event_image = [
      ...new Set([...existingImages, ...updateData.event_image]),
    ];
  }

  const updateEventData = {
    ...updateData,
    user_id: new mongoose.Types.ObjectId(userId),
  };

  await event.findByIdAndUpdate(eventId, updateEventData, {
    new: true,
  });

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event ${message.UPDATE_SUCCESS}`,
  );
};

const deleteEvent = async (id) => {
  const eventId = new mongoose.Types.ObjectId(id);
  const deletedEvent = await event.findByIdAndUpdate(
    eventId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

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

  let filter = { isDeleted: false };
  if (search) {
    filter.event_name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const sort = { event_name: sortOrder === "desc" ? -1 : 1 };

  const listAllEvents = await event
    .find(filter)
    .select("-user_id -isDeleted")
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

const getListEvents = async () => {
  const listEvents = await event.find().select("event_name");

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event ${message.GET_SUCCESS}`,
    listEvents,
  );
};

module.exports = {
  createEvent,
  getEvent,
  editEvent,
  deleteEvent,
  listEvent,
  getListEvents,
};
