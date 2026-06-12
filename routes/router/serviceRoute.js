const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../libs/helpers/validator");
const {
  serviceSchema,
  updateServiceSchema,
  listServiceSchema,
} = require("../../validations/serviceValidation");
const { authenticateToken } = require("../../libs/service/authentication/auth");
const serviceController = require("../../controllers/serviceController");

router.post(
  "/addService",
  authenticateToken,
  validateRequest(serviceSchema, "body"),
  serviceController.createService,
);
router.get("/viewService/:id", authenticateToken, serviceController.getService);
router.put(
  "/editService",
  authenticateToken,
  validateRequest(updateServiceSchema, "body"),
  serviceController.editService,
);
router.delete(
  "/deleteService/:id",
  authenticateToken,
  serviceController.deleteService,
);
router.post(
  "/listOfService",
  authenticateToken,
  validateRequest(listServiceSchema, "body"),
  serviceController.listService,
);

module.exports = router;
