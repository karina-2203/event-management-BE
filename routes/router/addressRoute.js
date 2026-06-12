const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/addressController");
const { validateRequest } = require("../../libs/helpers/validator");
const { addressSchema } = require("../../validations/addressValidation");
const { authenticateToken } = require("../../libs/service/authentication/auth");

router.post(
  "/addAddress",
  authenticateToken,
  validateRequest(addressSchema, "body"),
  addressController.addAddress,
);
router.get(
  "/viewAddress/:id",
  authenticateToken,
  addressController.viewAddress,
);
router.put("/editAddress", authenticateToken, addressController.editAddress);
router.delete(
  "/deleteAddress/:id",
  authenticateToken,
  addressController.deleteAddress,
);

module.exports = router;
