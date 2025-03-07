const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

router.get("/notification", NotificationController.getAll);
// router.get("/realtor/:id", RealtorController.getSingle);
// router.put("/realtor/:id", RealtorController.updateProfile);

module.exports = router;
