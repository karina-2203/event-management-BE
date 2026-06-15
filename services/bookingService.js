const booking = require("../models/booking");
const handleResponse = require("../libs/helpers/handleResponse");
const { responseData } = require("../libs/utils/enums");
const { StatusCodes } = require("http-status-codes");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");

const createBooking = async (userId, bookingData) => {
  const addBookingData = {
    ...bookingData,
    user_id: new mongoose.Types.ObjectId(userId),
  };
  const eventDate = new Date(addBookingData.event_date);
  const today = new Date();
  if (eventDate < today) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.ERROR,
      message.EVENT_DATE_VALIDATE,
    );
  }
  const createdBooking = await booking.create(addBookingData);

  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `Booking ${message.ADD_SUCCESS}`,
    {
      _id: createdBooking._id,
    },
  );
};

const getBooking = async (id) => {
  const bookingId = new mongoose.Types.ObjectId(id);
  const bookingData = await booking.findOne({
    _id: bookingId,
    isDeleted: false,
  });
  if (!bookingData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Booking ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Booking ${message.GET_SUCCESS}`,
    bookingData,
  );
};

const editBooking = async (userId, bookingData) => {
  const { booking_id, ...updateData } = bookingData;

  if (!booking_id) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.FAILED,
      message.BOOKING_ID_REQUIRED,
    );
  }
  const eventDate = new Date(bookingData.event_date);
  const today = new Date();
  if (eventDate < today) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.ERROR,
      message.EVENT_DATE_VALIDATE,
    );
  }
  const bookingId = new mongoose.Types.ObjectId(booking_id);

  const updateBookingData = {
    ...updateData,
    user_id: new mongoose.Types.ObjectId(userId),
  };

  const updatedService = await booking.findByIdAndUpdate(
    bookingId,
    updateBookingData,
    { new: true },
  );

  if (!updatedService) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Booking ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Booking ${message.UPDATE_SUCCESS}`,
  );
};

const deleteBooking = async (id) => {
  const bookingId = new mongoose.Types.ObjectId(id);
  const bookingData = await booking.findByIdAndUpdate(
    bookingId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  if (!bookingData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Booking ${message.NOT_FOUND}`,
    );
  }

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Booking ${message.DELETE_SUCCESS}`,
  );
};

const listBooking = async (payload) => {
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

  const listAllBooking = await booking
    .find(filter)
    .select("-user_id -isDeleted")
    .populate("address_id", "address_line1")
    .populate("event_manage_id", "event_name")
    .limit(parseInt(limit))
    .skip(skip)
    .sort(sort);

  const totalBooking = await booking.countDocuments(filter);

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Booking ${message.GET_SUCCESS}`,
    {
      services: listAllBooking,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalBooking / limit),
        totalBooking,
        limit: parseInt(limit),
      },
    },
  );
};

module.exports = {
  createBooking,
  getBooking,
  editBooking,
  deleteBooking,
  listBooking,
};
