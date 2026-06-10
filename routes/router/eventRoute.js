const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/eventController");
const { validateRequest } = require("../../libs/helpers/validator");
const {
  eventSchema,
  updateEventSchema,
} = require("../../validations/serviceValidation");
const { authenticateToken } = require("../../libs/service/authentication/auth");

router.post(
  "/addEvent",
  authenticateToken,
  validateRequest(eventSchema, "body"),
  eventController.createEvent,
);
router.get("/viewEvent/:id", authenticateToken, eventController.getEvent);
router.put(
  "/editEvent",
  authenticateToken,
  validateRequest(updateEventSchema, "body"),
  eventController.editEvent,
);
router.delete(
  "/deleteEvent/:id",
  authenticateToken,
  eventController.deleteEvent,
);
router.get("/listOfEvent", authenticateToken, eventController.listEvent);

module.exports = router;
