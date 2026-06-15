const event = require("../models/event");
const booking = require("../models/booking");
const user = require("../models/user");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData, months } = require("../libs/utils/enums");

const listLatestEvents = async () => {
  let filter = { isDeleted: false };

  const latestEvents = await event
    .find(filter)
    .select("-user_id")
    .sort({ createdAt: -1 });
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Events ${message.GET_SUCCESS}`,
    latestEvents,
  );
};

const listLatestBookings = async () => {
  let filter = { isDeleted: false };

  const latestBookings = await booking
    .find(filter)
    .select("-user_id")
    .sort({ createdAt: -1 });
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Bookings ${message.GET_SUCCESS}`,
    latestBookings,
  );
};

const countOfBookingStatus = async () => {
  let filter = { isDeleted: false };

  const latestBookings = await booking.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Bookings ${message.GET_SUCCESS}`,
    latestBookings,
  );
};

const countOfTotalUsers = async () => {
  const countOfUsers = await user.countDocuments();
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `User Count ${message.GET_SUCCESS}`,
    {
      userCount: countOfUsers,
    },
  );
};

const countOfTotalEvents = async () => {
  const countOfEvents = await event.countDocuments({ isDeleted: false });
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event Count ${message.GET_SUCCESS}`,
    {
      userCount: countOfEvents,
    },
  );
};

const countOfUserAndBooking = async () => {
  const countOfBooking = await booking.aggregate([
    {
      $match: {
        status: "approved",
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$event_date",
          },
        },
        bookingCount: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        bookingCount: 1,
      },
    },
  ]);
  const bookingData = await countOfBooking.map((item) => {
    return {
      month: months[item.month],
      bookingCount: item.bookingCount,
    };
  });

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Bookings ${message.GET_SUCCESS}`,
    bookingData,
  );
};

module.exports = {
  listLatestEvents,
  listLatestBookings,
  countOfBookingStatus,
  countOfTotalUsers,
  countOfTotalEvents,
  countOfUserAndBooking,
};
