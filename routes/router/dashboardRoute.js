const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");
const { authenticateToken } = require("../../libs/service/authentication/auth");

router.get(
  "/listOfLatestEvent",
  authenticateToken,
  dashboardController.listLatestEvents,
);

router.get(
  "/listOfLatestBooking",
  authenticateToken,
  dashboardController.listLatestBookings,
);

router.get(
  "/countOfBookingStatus",
  authenticateToken,
  dashboardController.countOfBookingStatus,
);

router.get(
  "/countOfTotalUser",
  authenticateToken,
  dashboardController.countOfTotalUsers,
);

router.get(
  "/countOfTotalEvent",
  authenticateToken,
  dashboardController.countOfTotalEvents,
);

router.get(
  "/graphOfUser",
  authenticateToken,
  dashboardController.countOfUserAndBooking,
);

module.exports = router;
