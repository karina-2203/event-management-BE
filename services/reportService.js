const event = require("../models/event");
const booking = require("../models/booking");
const user = require("../models/user");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData, months } = require("../libs/utils/enums");

const eventReport = async (user, payload) => {
  const isAdmin = user === "admin";
  let filter = { isDeleted: false };

  if (payload.event_date) {
    const startDate = new Date(payload.event_date);

    filter.event_date = {
      $eq: startDate,
    };
  }

  const bookingData = await booking
    .find(filter)
    .populate("event_manage_id", "event_name")
    .populate("user_id", "name email")
    .populate({
      path: "address_id",
      select: "address_line1 city_id state_id",
      populate: [
        {
          path: "city_id",
          select: "city_name",
        },
        {
          path: "state_id",
          select: "state_name",
        },
      ],
    })
    .select("event_date event_manage_id user_id address_id city_id state_id");
  const eventData = bookingData.map((item) => {
    const eventDate = new Date(item.event_date);
    const formattedDate = eventDate.toISOString().split("T")[0];
    if (isAdmin) {
      return {
        event_name: item.event_manage_id?.event_name,
        event_date: formattedDate,
        user_name: item.user_id?.name,
        user_email: item.user_id?.email,
        address: item.address_id?.address_line1,
        city: item.address_id?.city_id?.city_name,
        state: item.address_id?.state_id?.state_name,
      };
    } else {
      return {
        event_name: item.event_manage_id?.event_name,
        event_date: formattedDate,
        status: item.status,
      };
    }
  });

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Event Report ${message.GET_SUCCESS}`,
    eventData,
  );
};

const bookingReport = async (user, payload) => {
  const isAdmin = user === "admin";
  let filter = { isDeleted: false };

  if (payload.event_date) {
    const startDate = new Date(payload.event_date);

    filter.event_date = {
      $eq: startDate,
    };
  }

  const bookingData = await booking
    .find(filter)
    .populate("event_manage_id", "event_name")
    .populate("user_id", "name email")
    .populate({
      path: "address_id",
      select: "address_line1 city_id state_id",
      populate: [
        {
          path: "city_id",
          select: "city_name",
        },
        {
          path: "state_id",
          select: "state_name",
        },
      ],
    })
    .select(
      "event_date event_manage_id user_id address_id city_id state_id status additional_information",
    );

  const bookingReportData = bookingData.map((item) => {
    const eventDate = new Date(item.event_date);
    const formattedDate = eventDate.toISOString().split("T")[0];
    if (isAdmin) {
      return {
        event_name: item.event_manage_id?.event_name,
        event_date: formattedDate,
        user_name: item.user_id?.name,
        user_email: item.user_id?.email,
        address: item.address_id?.address_line1,
        city: item.address_id?.city_id?.city_name,
        state: item.address_id?.state_id?.state_name,
        status: item.status,
        additional_information: item.additional_information,
      };
    } else {
      return {
        event_name: item.event_manage_id?.event_name,
        event_date: formattedDate,
        address: item.address_id?.address_line1,
        city: item.address_id?.city_id?.city_name,
        state: item.address_id?.state_id?.state_name,
        status: item.status,
        additional_information: item.additional_information,
      };
    }
  });

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Booking Report ${message.GET_SUCCESS}`,
    bookingReportData,
  );
};

module.exports = {
  eventReport,
  bookingReport,
};
