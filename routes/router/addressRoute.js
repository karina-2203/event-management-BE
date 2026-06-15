const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/addressController");
const { validateRequest } = require("../../libs/helpers/validator");
const {
  addressSchema,
  updateAddressSchema,
  listAddressSchema,
} = require("../../validations/addressValidation");
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
router.put(
  "/editAddress",
  authenticateToken,
  validateRequest(updateAddressSchema, "body"),
  addressController.editAddress,
);
router.delete(
  "/deleteAddress/:id",
  authenticateToken,
  addressController.deleteAddress,
);
router.post(
  "/listOfAddress",
  authenticateToken,
  validateRequest(listAddressSchema, "body"),
  addressController.listAddress,
);

module.exports = router;
