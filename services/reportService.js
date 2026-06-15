const event = require("../models/event");
const booking = require("../models/booking");
const user = require("../models/user");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData, months } = require("../libs/utils/enums");

const eventReport = async (payload) => {
  let filter = { isDeleted: false };

  // Add date filtering if event_date is provided in payload
  if (payload.event_date) {
    const startDate = new Date(payload.event_date);
    startDate.setHours(0, 0, 0, 0); // Start of the day

    // const endDate = new Date(payload.event_date);
    // endDate.setHours(23, 59, 59, 999); // End of the day

    // Filter by event_date (booking date) range
    filter.event_date = {
      $gte: startDate,
      // $lte: endDate
    };
  }

  // Get bookings with populated event details
  const bookingData = await booking
    .find(filter)
    .populate("event_manage_id", "event_name")
    .select("event_date event_manage_id");

  // Format the response with event_name and formatted event_date
  const eventData = bookingData.map((item) => {
    const eventDate = new Date(item.event_date);
    const formattedDate = eventDate.toISOString().split("T")[0]; // yyyy-mm-dd format

    return {
      event_name: item.event_manage_id?.event_name || "N/A",
      event_date: formattedDate,
    };
  });

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Events ${message.GET_SUCCESS}`,
    eventData,
  );
};

const bookingReport = async (payload) => {
  let filter = { isDeleted: false };

  // Add date filtering if event_date is provided in payload
  if (payload.event_date) {
    const startDate = new Date(payload.event_date);
    startDate.setHours(0, 0, 0, 0); // Start of the day

    // const endDate = new Date(payload.event_date);
    // endDate.setHours(23, 59, 59, 999); // End of the day

    // Filter by event_date (booking date) range
    filter.event_date = {
      $gte: startDate,
      // $lte: endDate
    };
  }

  // Get bookings with populated event details
  const bookingData = await booking
    .find(filter)
    .populate("event_manage_id", "event_name")
    .select("event_date event_manage_id");

  // Format the response with event_name and formatted event_date
  const eventData = bookingData.map((item) => {
    const eventDate = new Date(item.event_date);
    const formattedDate = eventDate.toISOString().split("T")[0]; // yyyy-mm-dd format

    return {
      event_name: item.event_manage_id?.event_name || "N/A",
      event_date: formattedDate,
    };
  });

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Events ${message.GET_SUCCESS}`,
    eventData,
  );
};

module.exports = {
  eventReport,
  bookingReport,
};
