const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/bookingController");
const { validateRequest } = require("../../libs/helpers/validator");
const {
  bookingSchema,
  updateBookingSchema,
  listBookingSchema,
} = require("../../validations/bookingValidation");
const { authenticateToken } = require("../../libs/service/authentication/auth");

router.post(
  "/addBooking",
  authenticateToken,
  validateRequest(bookingSchema, "body"),
  bookingController.createBooking,
);
router.get("/viewBooking/:id", authenticateToken, bookingController.getBooking);
router.put(
  "/editBooking",
  authenticateToken,
  validateRequest(updateBookingSchema, "body"),
  bookingController.editBooking,
);
router.delete(
  "/deleteBooking/:id",
  authenticateToken,
  bookingController.deleteBooking,
);
router.post(
  "/listOfBooking",
  authenticateToken,
  validateRequest(listBookingSchema, "body"),
  bookingController.listBooking,
);

module.exports = router;
