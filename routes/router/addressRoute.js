const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/addressController");

router.post("/addAddress", addressController.addAddress);

module.exports = router;
