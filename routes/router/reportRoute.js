const express = require("express");
const router = express.Router();
const reportController = require("../../controllers/reportController");
const { authenticateToken } = require("../../libs/service/authentication/auth");
const { validateRequest } = require("../../libs/helpers/validator");
const { reportSchema } = require("../../validations/reportValidation");

router.post(
  "/eventReport",
  authenticateToken,
  validateRequest(reportSchema, "body"),
  reportController.eventReport,
);

router.post(
  "/bookingReport",
  authenticateToken,
  validateRequest(reportSchema, "body"),
  reportController.eventReport,
);

module.exports = router;
